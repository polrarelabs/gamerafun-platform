"use client";

import { client, Endpoint } from "@api";
import { Input, ScrollToError, Select } from "@components/FormControl";
import { Button, Text } from "@components/shared";
import {
  AGENT_CATEGORIES_OPTIONS,
  AGENT_DECIMALS,
  AN_ERROR_TRY_AGAIN,
  BONDING_PACKAGE_ID,
  CONFIG_BY_CURRENCY,
  FORM_DATA_HEADER,
} from "@constant";
import { AgentType, Currency } from "@constant/enum";
import {
  MISSING_ENV,
  PAYMENT_TOKEN_NOT_ENOUGH,
  REJECT_ERROR,
  TRANSACTION_NOT_FOUND_ERROR,
  WALLET_NOT_CONNECTED,
} from "@constant/error";
import { AGENT_DETAIL_PATH } from "@constant/paths";
import { Token } from "@constant/types";
import useSocket from "@hooks/useSocket";
import useToggle from "@hooks/useToggle";
import { ButtonBase, Collapse, Stack } from "@mui/material";
import { useSnackbar, useTokensBalance } from "@store/app";
import {
  cleanObject,
  getMessageErrorByAPI,
  getTicker,
  numberToBlockchain,
  onTriggerConnectWallet,
  uuid,
} from "@utils";
import { HttpStatusCode } from "axios";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { typography } from "public/material";
import { memo, useEffect, useMemo, useRef } from "react";
import StringFormat from "string-format";
import * as Yup from "yup";
import { Avatar, RaisedToken } from "./components";
import ChevronIcon from "@icons/common/ChevronIcon";
import { motion } from "framer-motion";
import Purchase from "./Purchase";
import { U64, U8 } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@contexts/WalletProvider";
import useAptosWallet from "@hooks/useAptosWallet";

type AgentRawData = {
  name: string;
  img: File;
  desc: string;
  symbol: string;
  type: AgentType;
  buyAmount: number;
  socials: {
    x: string;
    telegram?: string;
    website?: string;
  };
  currency: Currency;
  properties: {
    knowledge?: string;
    lore?: string;
    adjective?: string;
    first_message?: string;
    personality?: string;
  };
};

type AgentData = Omit<AgentRawData, "img"> & {
  img: string;
};

const Form = () => {
  const { onAddSnackbar } = useSnackbar();
  const { address, connected, signAndSubmitTransaction } = useAptosWallet();
  const [isShow, onShow, onHide] = useToggle();
  const { socket } = useSocket();
  const { push } = useRouter();
  const { onGetBalances, tokensBalance } = useTokensBalance();

  const agentNameRef = useRef<string>("");
  const avatarRef = useRef<string | undefined>(undefined);

  const [isExpanded, , , onToggleExpanded] = useToggle();

  const onUploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file?.name ?? "Logo_" + uuid());

      const response = await client.post(Endpoint.UPLOAD, formData, {
        headers: FORM_DATA_HEADER,
      });
      if (response?.status === HttpStatusCode.Created) {
        avatarRef.current = response.data.cdn;
        return response.data.cdn;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (values: AgentRawData) => {
    agentNameRef.current = values.name;
    try {
      if (!address) throw WALLET_NOT_CONNECTED;
      if (!paymentBalance) throw PAYMENT_TOKEN_NOT_ENOUGH;

      const config = CONFIG_BY_CURRENCY[values.currency];
      if (!BONDING_PACKAGE_ID || !config) throw MISSING_ENV;

      const img =
        avatarRef.current ?? ((await onUploadFile(values.img)) as string);

      const rawData = cleanObject({ ...values }) as AgentRawData;

      const data = {
        ...rawData,
        img,
      } as AgentData;

      const committedTransaction = await signAndSubmitTransaction({
        data: {
          function: `${BONDING_PACKAGE_ID}::noctra_agent::create_agent`,
          typeArguments: [config.coinType],
          functionArguments: [
            data.name,
            data.symbol,
            data.desc,
            data.img,
            data?.buyAmount
              ? new U64(numberToBlockchain(data.buyAmount, AGENT_DECIMALS))
              : 0,
            data.socials.x,
            data.socials?.telegram ?? "",
            data.socials?.website ?? "",
            new U8(1),
            data.properties?.personality ?? "",
            data.properties?.first_message ?? "",
            data.properties?.lore ?? "",
            data.type,
            data.properties?.adjective ?? "",
            data.properties?.knowledge ?? "",
            generateFullU8Array(),
          ],
        },
      });

      await aptosClient.waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
    } catch (error) {
      console.error(error);
      if (
        error?.toString()?.includes(REJECT_ERROR) ||
        error?.toString()?.startsWith(TRANSACTION_NOT_FOUND_ERROR)
      )
        return;
      onAddSnackbar(getMessageErrorByAPI(error), "error");
      agentNameRef.current = "";
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const paymentBalance = useMemo(
    () => tokensBalance[formik.values.currency],
    [formik.values.currency, tokensBalance],
  );

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<AgentRawData>, [key, error]) => {
        if (formik.touched[key]) {
          out[key] = error;
        }
        return out;
      },
      {},
    );
  }, [formik.touched, formik.errors]);

  const disabled = useMemo(
    () => !!Object.values(touchedErrors)?.length || formik.isSubmitting,
    [touchedErrors, formik.isSubmitting],
  );

  const isButtonNextStep = useMemo(() => {
    const { img, name, symbol, desc, type } = formik.values;
    return (
      !Object.values(formik.errors).length &&
      Boolean(img && name && symbol && desc && type)
    );
  }, [formik.errors, formik.values]);

  const onChangeField = (fieldName: string, newValue) => {
    formik.setFieldValue(fieldName, newValue);
    if (fieldName === "img") {
      avatarRef.current = undefined;
    }
  };

  const onTouchedField = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value?.trim());
    formik.handleBlur(event);
  };

  const onRatioAvatar = (ratio: number) => {
    formik.setFieldValue("imgRatio", ratio);
  };

  const onChangeBuyAmount = (newValue) => {
    if (newValue && Number(newValue) > 1_000_000_000) {
      return;
    }
    formik.setFieldValue("buyAmount", newValue);

    setTimeout(() => {
      formik.validateForm();
    }, 250);
  };

  const onClose = () => {
    onHide();
    formik.setFieldValue("buyAmount", 0);
  };

  useEffect(() => {
    if (!socket || !address) return;
    socket.on("app.created", (data: Token) => {
      if (agentNameRef.current !== data.name) return;
      push(StringFormat(AGENT_DETAIL_PATH, { token: data.pool_id }));
      onGetBalances(address);
      onAddSnackbar(
        "The agent has been created successfully",
        "info",
        "Please wait a few minutes for the system to initialize agent.",
      );
      onHide();
      formik.resetForm();
      avatarRef.current = undefined;
      agentNameRef.current = "";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, onAddSnackbar, onHide, push, socket]);

  useEffect(() => {
    if (!address) return;
    onGetBalances(address);
  }, [address, onGetBalances]);

  useEffect(() => {
    formik.setFieldValue("balance", paymentBalance || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentBalance]);

  return (
    <Stack
      spacing={2.5}
      maxWidth={900}
      mx="auto"
      width="100%"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Avatar
        name="img"
        label="AI Agent Profile Image"
        required
        onChange={onChangeField}
        value={formik.values?.img}
        error={
          (formik.values?.img ? formik.errors?.img : touchedErrors?.img) as
            | string
            | undefined
        }
        onRatio={onRatioAvatar}
      />

      <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
        <Input
          name="name"
          label="AI Agent Name"
          placeholder="Agent Name"
          required
          value={formik.values.name}
          error={touchedErrors?.name}
          onChange={formik.handleChange}
          onBlur={onBlur}
          maxLength={MAX_NAME_LENGTH}
        />
        <Input
          name="symbol"
          startAdornment={
            <Text
              pl={1}
              variant="subtitle1"
              fontWeight={500}
              color="grey.400"
              lineHeight={1.356}
            >
              $
            </Text>
          }
          sx={{
            "& input": {
              pl: 0.5,
            },
          }}
          label="Ticker"
          placeholder=""
          required
          value={formik.values.symbol}
          error={touchedErrors?.symbol}
          onChange={formik.handleChange}
          onBlur={onBlur}
          maxLength={MAX_SYMBOL_LENGTH}
        />
      </Stack>

      <Input
        name="desc"
        label="AI Agent Description"
        placeholder="Set the character and behavior of your AI Agent"
        multiline
        required
        value={formik.values.desc}
        error={touchedErrors?.desc}
        minRows={4}
        maxRows={4}
        onChange={formik.handleChange}
        onBlur={onBlur}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
        <Select
          name="type"
          label="Agent Type"
          required
          value={formik.values.type}
          error={touchedErrors?.type}
          onTouched={onTouchedField}
          onChange={onChangeField}
          options={AGENT_CATEGORIES_OPTIONS}
          showPlaceholder={false}
        />
        <RaisedToken
          label="Liquidity"
          name="currency"
          required
          value={formik.values?.currency}
          onChange={onChangeField}
        />
      </Stack>
      <Stack
        direction="row"
        display="grid"
        gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={2.5}
      >
        <Input
          name="socials.x"
          label="X (Twitter)"
          placeholder="https://x.com/noctra_ai"
          required
          value={formik.values.socials.x}
          error={touchedErrors?.socials?.x}
          onChange={formik.handleChange}
          onBlur={onBlur}
        />
        <Input
          name="socials.telegram"
          label="Telegram"
          placeholder="https://t.me/noctra_ai"
          value={formik.values.socials.telegram}
          error={touchedErrors?.socials?.telegram}
          onChange={formik.handleChange}
          onBlur={onBlur}
        />
        <Input
          name="socials.website"
          label="Website"
          placeholder="https://noctra.ai"
          value={formik.values.socials.website}
          error={touchedErrors?.socials?.website}
          onChange={formik.handleChange}
          onBlur={onBlur}
        />
      </Stack>
      <Stack
        component={ButtonBase}
        onClick={onToggleExpanded}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
        color="grey.400"
        pb={isExpanded ? 0 : 8}
      >
        <Text variant="subtitle1" color="inherit">
          Advanced Properties
        </Text>
        <ChevronIcon
          fontSize="small"
          color="inherit"
          component={motion.svg}
          animate={{ rotate: isExpanded ? -180 : 0 }}
        />
      </Stack>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Stack spacing={2.5} mb={8}>
          <Input
            name="properties.knowledge"
            label="Knowledge"
            placeholder="Knowledge is a collection of information that the agent knows."
            multiline
            value={formik.values.properties?.knowledge}
            minRows={4}
            maxRows={4}
            onChange={formik.handleChange}
            onBlur={onBlur}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <Input
            name="properties.lore"
            label="Lore"
            placeholder="Lore is a collection of information that the agent knows."
            multiline
            value={formik.values.properties?.lore}
            minRows={4}
            maxRows={4}
            onChange={formik.handleChange}
            onBlur={onBlur}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <Input
            name="properties.adjective"
            label="Adjective"
            placeholder="Adjective is a word that describes the agent."
            multiline
            value={formik.values.properties?.adjective}
            minRows={4}
            maxRows={4}
            onChange={formik.handleChange}
            onBlur={onBlur}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <Input
            name="properties.first_message"
            label="First Message"
            placeholder="First message is the first message the agent sends to the user."
            multiline
            value={formik.values.properties?.first_message}
            minRows={4}
            maxRows={4}
            onChange={formik.handleChange}
            onBlur={onBlur}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <Input
            name="properties.personality"
            label="Personality"
            placeholder="Personality is the way the agent behaves."
            multiline
            value={formik.values.properties?.personality}
            minRows={4}
            maxRows={4}
            onChange={formik.handleChange}
            onBlur={onBlur}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
        </Stack>
      </Collapse>

      <Button
        type={!connected || isButtonNextStep ? "button" : "submit"}
        onClick={
          !connected
            ? onTriggerConnectWallet
            : isButtonNextStep
              ? onShow
              : undefined
        }
        fullWidth
        disabled={disabled}
        variant="contained"
        size="large"
        sx={{
          alignSelf: "center",
        }}
      >
        {connected ? "Create Agent" : "Connect Wallet"}
      </Button>
      <Purchase
        onClose={onClose}
        isSubmitting={formik.isSubmitting}
        open={isShow}
        ticker={formik.values?.symbol}
        image={formik.values?.img}
        currency={formik.values?.currency}
        inputProps={{
          onChangeText: onChangeBuyAmount,
          value: formik.values?.buyAmount,
          error: StringFormat(formik.errors?.buyAmount || "", {
            ticker: getTicker(formik.values?.currency),
          }),
        }}
        disabled={formik.isSubmitting}
      />
      <ScrollToError submitting={formik.isSubmitting} />
    </Stack>
  );
};

export default memo(Form);

const INITIAL_VALUES = {
  name: "",
  desc: "",
  img: "",
  symbol: "",
  imgRatio: 1,
  type: AgentType.DEFI,
  buyAmount: 0,
  socials: {
    x: "",
    telegram: "",
    website: "",
  },
  currency: Currency.GAMERA,
  properties: {
    knowledge: "",
    lore: "",
    adjective: "",
    first_message: "",
    personality: "",
  },
} as unknown as AgentRawData;

const ALPHABET_REGEX = /^[A-Za-z]+$/;

const MAX_NAME_LENGTH = 32;
const MAX_SYMBOL_LENGTH = 8;
const MAX_DESCRIPTION_LENGTH = 255;
const SIZE_ALLOWED = 5 * 1024 * 1024;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("AI Agent Name is required.")
    .max(
      MAX_NAME_LENGTH,
      `AI Agent Name must be at most ${MAX_NAME_LENGTH} characters.`,
    ),
  symbol: Yup.string()
    .trim()
    .required("Ticker is required.")
    .min(3, "Ticker must be at least 3 characters.")
    .max(
      MAX_SYMBOL_LENGTH,
      `Ticker must be at most ${MAX_SYMBOL_LENGTH} characters.`,
    )
    .matches(ALPHABET_REGEX, "Ticker must be alphabet characters."),
  desc: Yup.string()
    .trim()
    .required("AI Agent Description is required.")
    .max(
      MAX_DESCRIPTION_LENGTH,
      `AI Agent Description must be at most ${MAX_DESCRIPTION_LENGTH} characters.`,
    ),
  type: Yup.mixed<AgentType>()
    .oneOf(Object.values(AgentType) as AgentType[], "Agent Type is invalid.")
    .required("gent Type is required."),
  img: Yup.string()
    .required("AI Agent Profile Image is required.")
    .test(
      "is-ratio",
      "AI Agent Profile Image must be ratio 1:1.",
      (value, schema) => {
        return !value || Math.abs(1 - schema.parent.imgRatio) <= 0.05;
      },
    )
    .test(
      "is-match-extension",
      "AI Agent Profile Image is invalid, must be a file of type: SVG, PNG, JPG, JPEG",
      (value, schema) => {
        return (
          !value ||
          ["image/png", "image/jpg", "image/svg", "image/jpeg"].includes(
            schema.originalValue.type.toLowerCase(),
          )
        );
      },
    )
    .test(
      "is-size-allowed",
      "AI Agent Profile Image exceeds the maximum size limit of 5MB.",
      (value, schema) => {
        return !value || (schema.originalValue as File).size <= SIZE_ALLOWED;
      },
    ),
  socials: Yup.object().shape({
    x: Yup.string()
      .trim()
      .required("X (Twitter) URL is required.")
      .test(
        "is-invalid",
        "URL is invalid",
        (value) => !value || value.startsWith("https://x.com/"),
      ),
    telegram: Yup.string()
      .trim()
      .test(
        "is-invalid",
        "URL is invalid",
        (value) => !value || value?.startsWith("https://t.me/"),
      ),
    website: Yup.string()
      .trim()
      .test(
        "is-invalid",
        "URL is invalid",
        (value) => !value || value?.startsWith("http"),
      ),
  }),
  buyAmount: Yup.number().test(
    "is-over-balance",
    "Insufficient balance",
    (value, { parent }) => {
      return !value || Number(parent?.balance) >= Number(value);
    },
  ),
});

const generateFullU8Array = () => {
  // Create array from 0 to 255
  const nums = Array.from({ length: 256 }, (_, i) => i.toString());

  // Fisher-Yates shuffle
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // Take random length subset (10-40)
  const length = Math.floor(Math.random() * 31) + 10; // 31 = (40-10+1)
  return nums.slice(0, length);
};
