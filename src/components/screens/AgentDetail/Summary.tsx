import { memo, ReactNode } from "react";
import { Image, Text, TextProps } from "@components/shared";
import { useTokenDetail } from "@store/token";
import useToggle from "@hooks/useToggle";
import { getMaxLinesCss } from "@utils";
import { Skeleton, Stack } from "@mui/material";
import Link from "@components/Link";
import LinkBlankIcon from "@icons/web3/LinkBlankIcon";
import TelegramIcon from "@icons/socials/TelegramIcon";
import TwitterIcon from "@icons/socials/TwitterIcon";
import { Heading } from "./components";

type SummaryProps = {};

type AvailableItemProps = {
  icon: ReactNode;
  bgcolor: string;
  label: string;
  value: string;
  href: string;
};

const Summary = (props: SummaryProps) => {
  const { token } = useTokenDetail();

  const [isShow, , , onToggle] = useToggle();

  if (!token) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          height: 400,
        }}
        width="100%"
      />
    );
  }

  return (
    <>
      <Heading>Biography</Heading>
      <Text
        py={1.25}
        sx={isShow ? {} : getMaxLinesCss(3)}
        color="grey.400"
        minHeight={200}
        variant="body2"
      >
        {token.description.replace(/\n+/, "\n")}
      </Text>
      {token?.description?.length > 500 && (
        <Text
          onClick={onToggle}
          textTransform="uppercase"
          variant="subtitle2"
          fontWeight={700}
          color="primary.main"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": "primary.light",
          }}
        >
          {isShow ? "Show less" : "Show more"}
        </Text>
      )}
      {/* <Heading mt={4}>Available At</Heading>
      <Stack
        mt={2}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        <AvailableItem
          label="Crypto Buffet Agentic Twitter Agent"
          value="Agentic Twitter Agent"
          icon={<TelegramIcon fontSize="medium" />}
          href="#"
          bgcolor="#27A6E6"
        />
        <AvailableItem
          label="Crypto Buffet Agentic Twitter Agent"
          value="Agentic Twitter Agent"
          icon={<TwitterIcon fontSize="medium" />}
          href="#"
          bgcolor="#000000"
        />
      </Stack> */}

      {/* <Heading mt={4}>Capabilities</Heading>
      <Stack direction="row" gap={2} mt={2} flexWrap="wrap" width="82%">
        <Tag>Search Db By Username</Tag>
        <Tag>Wait</Tag>
        <Tag>Browse Tweet Content From Influential Users</Tag>
        <Tag>Search Tweet By Username</Tag>
        <Tag>Get Token Info</Tag>
        <Tag>Search Internet</Tag>
        <Tag>Quote Tweet</Tag>
        <Tag>Reply Tweet</Tag>
        <Tag>Post Tweet</Tag>
      </Stack> */}
    </>
  );
};

export default memo(Summary);

const AvailableItem = (props: AvailableItemProps) => {
  const { bgcolor, icon, label, value, href } = props;

  return (
    <Stack
      direction="row"
      px={1.5}
      py={1.875}
      bgcolor="background.paper"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack
          width={48}
          height={48}
          minWidth={48}
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          bgcolor={bgcolor}
        >
          {icon}
        </Stack>
        <Stack width="100%" spacing={0.5}>
          <Text variant="subtitle2" fontWeight={500} color="grey.400">
            {label}
          </Text>
          <Text variant="subtitle2">{value}</Text>
        </Stack>
      </Stack>
      <Link href={href}>
        <LinkBlankIcon sx={{ color: "grey.400" }} />
      </Link>
    </Stack>
  );
};

const Tag = (props: TextProps) => {
  return (
    <Text
      width="fit-content"
      border="1px solid"
      borderColor="divider"
      borderRadius={1}
      bgcolor="background.paperChannel"
      px={1.5}
      pt={0.5}
      pb={0.875}
      color="grey.400"
      // height={32}
      {...props}
    />
  );
};
