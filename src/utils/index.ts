import {
  AN_ERROR_TRY_AGAIN,
  CONNECT_BUTTON_ID,
  DATE_FORMAT_SLASH,
  EMPTY_TEXT,
} from "@constant";
import {
  OptionFormatNumber,
  OptionLimitDecimal,
  Params,
} from "@constant/types";
import { DateArg, format, formatDistance, parseISO } from "date-fns";
import StringFormat from "string-format";
import { Breakpoint } from "@mui/material";
import cookieCutter from "cookie-cutter";
import {
  TOKEN_NOT_ENOUGH,
  MISSING_ENV,
  PAYMENT_TOKEN_NOT_ENOUGH,
  WALLET_NOT_CONNECTED,
} from "@constant/error";
// @ts-expect-error: Unreachable code error
import enUSLocale from "date-fns/locale/en-US";

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatNumber = (
  number?: number | null | string,
  options: OptionFormatNumber = {},
  isFetching?: boolean,
) => {
  if (typeof number === "string") return number;
  const {
    numberOfFixed = 4,
    emptyText = EMPTY_TEXT,
    suffix,
    prefix = "",
    space = true,
    getMinDecimal = true,
    groupZeroDecimal = true,
    ...localeOption
  } = options;
  const suffixParsed = suffix ? `${space ? " " : ""}${suffix}` : "";
  if (!number && number !== 0)
    return (isFetching ? EMPTY_TEXT : emptyText) + suffixParsed;
  const num = Number(number || 0);

  let _numberOfFixed = numberOfFixed;

  let numberGroupZeroDecimal = 0;

  const notationNumber = num.toFixed(26);

  if (getMinDecimal && num > 0 && num < 1) {
    _numberOfFixed = (notationNumber.split(".")[1] ?? "")
      .split("")
      .findIndex((char) => Number(char) > 0);

    if (_numberOfFixed !== -1) {
      if (groupZeroDecimal && _numberOfFixed > 4) {
        numberGroupZeroDecimal = _numberOfFixed;
      }
      _numberOfFixed += numberOfFixed;
    }
  }

  const maximumFractionDigits = Number.isInteger(num) ? 0 : _numberOfFixed;

  if (numberGroupZeroDecimal === 0) {
    const outValue = num.toLocaleString("en-US", {
      maximumFractionDigits,
      ...localeOption,
    });

    return prefix + outValue + suffixParsed;
  }

  const splitOut = notationNumber.split(".");

  const integerOut = Number(splitOut[0]).toLocaleString("en-US");
  const decimalOut = splitOut[1] ?? "";

  const groupDecimal =
    `0{${numberGroupZeroDecimal}}` +
    decimalOut.slice(numberGroupZeroDecimal, maximumFractionDigits);

  return prefix + integerOut + "." + groupDecimal + suffixParsed;
};

export const cleanObject = (paramsObject, ignoreKeys: string[] = []) => {
  const cloneParamsObject = { ...paramsObject };
  for (const keyParam in paramsObject) {
    if (
      cloneParamsObject[keyParam] &&
      typeof cloneParamsObject[keyParam] === "object" &&
      !Array.isArray(cloneParamsObject[keyParam])
    ) {
      cloneParamsObject[keyParam] = cleanObject(
        cloneParamsObject[keyParam],
        ignoreKeys,
      );
    } else if (
      !ignoreKeys.includes(keyParam) &&
      (cloneParamsObject[keyParam] === null ||
        cloneParamsObject[keyParam] === "" ||
        cloneParamsObject[keyParam] === undefined)
    ) {
      delete cloneParamsObject[keyParam];
    } else if (typeof cloneParamsObject[keyParam] === "string") {
      cloneParamsObject[keyParam] = cloneParamsObject[keyParam].replace(
        /\n+/,
        "\n",
      );
    }
  }
  return cloneParamsObject;
};

export const removeDuplicateItem = (data, key = "id") => {
  return data.reduce((outArr, currentItem) => {
    const isExisted = outArr.some((item) => item[key] === currentItem[key]);
    if (isExisted) {
      return outArr;
    }
    outArr.push(currentItem);
    return outArr;
  }, []);
};

export const formatDateFromISOString = (
  value?: string | number,
  format = DATE_FORMAT_SLASH,
) => {
  if (typeof window === "undefined") return;
  if (!value) return value;

  if (typeof value === "number") {
    value = new Date(value).toISOString();
  }

  // 2023-02-05T14:13:58.000Z
  const years = value.slice(0, 4);
  const months = value.slice(5, 7);
  const days = value.slice(8, 10);
  const hours = value.slice(11, 13);
  const minutes = value.slice(14, 16);
  const seconds = value.slice(17, 19);

  let dateFormat = format.replace("yyyy", years);
  dateFormat = dateFormat.replace("MM", months);
  dateFormat = dateFormat.replace("dd", days);
  dateFormat = dateFormat.replace("HH", hours);
  dateFormat = dateFormat.replace("mm", minutes);
  dateFormat = dateFormat.replace("ss", seconds);

  return dateFormat;
};

export const capitalizeFirstLetter = (value?: string, fallback = "") => {
  if (!value) return fallback;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const stringifyURLSearchParams = (data) => {
  data = cleanObject(data);
  if (!Object.keys(data).length) return "";
  return (
    "?" +
    Object.entries(data || {})
      .reduce((out: string[], [key, value]) => {
        if (Array.isArray(value)) {
          out = [...out, ...value.map((valueItem) => `${key}=${valueItem}`)];
        } else {
          out.push(`${key}=${value}`);
        }
        return out;
      }, [])
      .join("&")
  );
};

export const getPath = (
  basePath: string,
  queries?: Params,
  data?: { [key: string]: string },
) => {
  queries = cleanObject(queries ?? {});
  const queryString = stringifyURLSearchParams(queries);
  const path = data ? StringFormat(basePath, data) : basePath;
  return path + queryString;
};

export const slugify = (text: string) => {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

export const parseURLSearchParams = (searchParams: URLSearchParams) => {
  const params: { [key: string]: string | string[] | undefined } | object = {};
  searchParams.forEach((value, key) => {
    params[key] = params[key]
      ? Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value]
      : value;
  });
  return params;
};

export const longTime = (value: number) => (value < 10 ? "0" + value : value);

export const formatTime = (time?: number) => {
  if (!time) return EMPTY_TEXT;

  const milliseconds = time % 1000;

  const minutes = parseInt(((time - milliseconds) / 1000 / 60).toString());
  const secs = ((time - milliseconds) / 1000) % 60;

  return `${longTime(minutes)}:${longTime(secs)}.${longTime(milliseconds)}`;
};

export const parseJSON = (
  data: string | undefined,
  defaultData: unknown,
): unknown => {
  try {
    if (!data) return defaultData;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};

export const groupData = (
  data: unknown[],
  keyGroup: string,
): { [key: number]: unknown[] } => {
  if (!data) return {};
  return data.reduce((r: { [key: number]: unknown[] }, a) => {
    if (a?.[keyGroup]) {
      r[a[keyGroup]] = r[a[keyGroup]] || [];
      r[a[keyGroup]].push(a);
    }
    return r;
  }, {});
};

export const formatCash = (
  value?: number,
  options?: OptionFormatNumber,
  tinyNumber = 0,
  maximumFractionDigits = 1,
) => {
  if (value === undefined) return formatNumber(value, options);
  let _options = {
    ...options,
    numberOfFixed: maximumFractionDigits,
  };
  if (value < 1e3 - tinyNumber) {
    return formatNumber(value, _options);
  } else if (value < 1e6 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "K " + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e3), _options);
  } else if (value < 1e9 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "M " + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e6), _options);
  } else if (value < 1e12 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "B " + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e9), _options);
  } else if (value > 0) {
    _options = {
      ..._options,
      space: false,
      suffix: "T " + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e12), _options);
  }
  return formatNumber(value, _options);
};

export const isNil = (value) => value === undefined || value === null;

export const formatDate = (
  value?: string | number | Date,
  dateFormat = DATE_FORMAT_SLASH,
) => {
  try {
    if (!value) throw "Error";
    if (typeof value === "string") {
      value = value.replace("T", "");
      value = parseISO(value);
    }
    return format(value, dateFormat);
  } catch (_) {
    return EMPTY_TEXT;
  }
};

export const shortAddress = (address?: string, count = 4) => {
  if (!address) return;
  return address.slice(0, count) + "..." + address.slice(-count);
};

export const formatUSDCurrency = (
  number?: number,
  options?: OptionFormatNumber,
) => {
  return formatNumber(number, {
    minimumFractionDigits: 0,
    ...options,
    style: "currency",
    currency: "USD",
    emptyText: options?.emptyText ?? "$ --",
  });
};

export const joinQuery = (data, _schemaKeys?: { [key: string]: string }) => {
  return Object.entries(data)
    .reduce((out: string[], [key, value]) => {
      if (value !== undefined) {
        out.push(`${key},${value}`);
      }
      return out;
    }, [])
    .join(";");
};

export const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string | number } | object,
) => {
  switch (currentRatio) {
    case "xxl" as Breakpoint:
      return (
        options["xxl"] ??
        options["xl"] ??
        options["elg"] ??
        options["lg"] ??
        options["md"] ??
        options["sm"] ??
        options["xs"]
      );
    case "xl":
      return (
        options["xl"] ??
        options["elg"] ??
        options["lg"] ??
        options["md"] ??
        options["sm"] ??
        options["xs"]
      );
    case "elg" as Breakpoint:
      return (
        options["elg"] ??
        options["lg"] ??
        options["md"] ??
        options["sm"] ??
        options["xs"]
      );
    case "lg":
      return options["lg"] ?? options["md"] ?? options["sm"] ?? options["xs"];
    case "md":
      return options["md"] ?? options["sm"] ?? options["xs"];
    case "sm":
      return options["sm"] ?? options["xs"];
    case "xs":
      return options["xs"];
    default:
      return;
  }
};

export const spacingCapitalize = (text?: string, fallback = "N/A") => {
  if (!text) return fallback;
  text = text.trim();
  return (
    text.charAt(0).toUpperCase() + text.slice(1).replace(/([A-Z])/g, " $1")
  );
};

export const getFiltersFromQueries = (
  queries,
  skipValue = [undefined, null, ""],
) => {
  return Object.entries(queries || {}).reduce((out, [key, value]) => {
    if (
      !["pageSize", "pageIndex", "concat"].includes(key) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !skipValue.includes(value as any)
    ) {
      out[key] = value;
    }
    return out;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {}) as { [key: string]: any };
};

export const getMaxLinesCss = (lines = 2) => {
  return {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
  };
};

const errorByWeb3 = (error) => {
  switch (error?.["code"]) {
    case "UNPREDICTABLE_GAS_LIMIT":
      return "Your balance is not enough to make the transaction because the fee includes both gas fee and token.";
    default:
      return AN_ERROR_TRY_AGAIN;
  }
};

const errorCodeToMessage = (code: string) => {
  switch (code) {
    case MISSING_ENV:
      return "Missing environment variable";
    case WALLET_NOT_CONNECTED:
      return "Wallet not connected";
    case TOKEN_NOT_ENOUGH:
      return "Your token balance not enough to make this transaction.";
    case PAYMENT_TOKEN_NOT_ENOUGH:
      return "Your payment token balance not enough to make this transaction.";
    default:
      return code;
  }
};

const ERROR_FROM_RPC = "Internal JSON-RPC error";

export const getMessageErrorByAPI = (error) => {
  const graphQLMessageErrors = error?.["networkError"]?.["result"]?.errors?.map(
    (item) => item.message,
  ) as string[] | undefined;

  const message = Array.isArray(graphQLMessageErrors)
    ? graphQLMessageErrors.join(". ")
    : !error?.["message"] || error?.["message"]?.includes(ERROR_FROM_RPC)
      ? errorByWeb3(error)
      : errorCodeToMessage(error);

  return (
    capitalizeFirstLetter(
      typeof error === "string" ? errorCodeToMessage(error) : message,
    ) ?? AN_ERROR_TRY_AGAIN
  );
};

export const setCookie = (key: string, data, options = {}) => {
  cookieCutter.set(key, data ? JSON.stringify(data) : data, {
    path: "/",
    ...options,
  });
};

export const onTriggerConnectWallet = () => {
  document.getElementById(CONNECT_BUTTON_ID)?.click();
};

export const blockchainToNumber = (value: number, decimals: number) =>
  value / Math.pow(10, decimals);
export const numberToBlockchain = (value: number, decimals: number) =>
  value * Math.pow(10, decimals);

export const displayPercent = (
  value?: number,
  options?: OptionFormatNumber,
) => {
  return formatNumber(value, {
    suffix: "%",
    space: false,
    numberOfFixed: 2,
    ...options,
  });
};

export const limitDecimalNumber = (
  value: number,
  decimalCount = 2,
  options?: OptionLimitDecimal,
) => {
  const { getMinDecimal = true, convertString } = (options ||
    {}) as OptionLimitDecimal;

  const valueString = value.toFixed(26);
  const arraySplit = valueString.split(".");
  const decimal = arraySplit[1] || "";

  const minDecimal = getMinDecimal
    ? decimal.split("").findIndex((char) => Number(char) > 0) + 1
    : 0;

  const newValue = `${arraySplit[0]}.${decimal.slice(0, decimalCount > minDecimal ? decimalCount : minDecimal)}`;

  if (convertString) {
    return newValue;
  }

  return Number(newValue);
};

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

export const shortDistance = (
  laterDate: DateArg<Date>,
  earlierDate: DateArg<Date>,
) => {
  return formatDistance(laterDate, earlierDate, {
    addSuffix: true,
    locale: {
      ...enUSLocale,
      formatDistance: (token, count, options = {}) => {
        const result = formatDistanceLocale[token].replace(
          "{{count}}",
          count.toString(),
        );

        if (options.addSuffix) {
          if (Number(options?.comparison) > 0) {
            return "in " + result;
          } else {
            return result + " ago";
          }
        }

        return result;
      },
    },
  });
};

export const getTicker = (symbol?: string) => `$${symbol}`;

export const parsedRatioString = (ratio: string) => {
  const arrValue = ratio
    .split(ratio.includes("x") ? "x" : ":")
    .map((item) => Number(item.trim()));
  const result = arrValue[0] / arrValue[1];
  if (isNaN(result)) throw new Error('Ratio is invalid, VD: ratio="16x9"');
  return result;
};
