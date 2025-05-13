import { AgentType, Currency } from "./enum";
import { CoinType } from "./types";

export const DOMAIN = (process.env.NEXT_PUBLIC_DOMAIN ||
  "http://localhost:3000") as string;
export const GOOGLE_ANALYTICS_ID = process.env
  .NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;
export const API_URL = process.env.API_URL as string;
export const SOCKET_URL = process.env.SOCKET_URL as string;
export const BONDING_PACKAGE_ID = process.env.BONDING_PACKAGE_ID as string;
export const NOCTRA_COIN_TYPE = process.env.NOCTRA_COIN_TYPE as CoinType;
export const USDC_COIN_TYPE = process.env.USDC_COIN_TYPE as CoinType;
export const APTOS_API_KEY = process.env.APTOS_API_KEY as string;
export const APP_ENVIRONMENT = process.env
  .APP_ENVIRONMENT as typeof process.env.NODE_ENV;

export const APTOS_COIN_TYPE = "0x1::aptos_coin::AptosCoin" as CoinType;

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 12;

export const DEFAULT_PAGING = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const API_TIMEOUT = 30_000;

export const EMPTY_TEXT = "N/A";
export const AUTH_COOKIE = "aI";
export const CONNECT_BUTTON_ID = "cB";

export const TIME_FORMAT = "HH:mm";
export const DATE_FORMAT_SLASH = "MM/dd/yyyy";
export const DATE_TIME_FORMAT_SLASH = `${DATE_FORMAT_SLASH} ${TIME_FORMAT}`;
export const DATE_FORMAT_HYPHEN = "yyyy-MM-dd";
export const DATE_TIME_FORMAT_HYPHEN = `${DATE_FORMAT_HYPHEN} ${TIME_FORMAT}`;

export const AN_ERROR_TRY_AGAIN = "An error occurred. Please try again!";
export const AN_ERROR_TRY_RELOAD_PAGE =
  "An error occurred. Please try reload page.";

export const FORM_DATA_HEADER = {
  "Content-Type": "multipart/form-data",
};

export const HEADER_HEIGHT = 76;
export const SCREEN_PX = { xs: 1.5, sm: 2, md: 6, xl: 8 };
export const MIN_HEIGHT_SCREEN = `calc(100svh - ${HEADER_HEIGHT}px - 188px)`;

export const APP_TOKEN_NAME = "NOCTRA";
export const APP_TOKEN_IMAGE = "/images/img-logo.png";

export const AGENT_DECIMALS = 8;
export const TOKEN_DECIMAL = 6;

export const FEE_BPS = 100; // Default fee in basis points (1%)
export const BASIS_POINTS = 10000; // Used for percentage calculations (100% = 10000)

export const CONFIG_BY_CURRENCY: {
  [key in Currency]: {
    name: string;
    decimals: number;
    icon: string;
    coinType: CoinType;
  };
} = {
  [Currency.APT]: {
    name: "APT",
    decimals: 8,
    icon: "/images/img-aptos.svg",
    coinType: APTOS_COIN_TYPE,
  },
  [Currency.USDC]: {
    name: "USDC",
    decimals: 8,
    icon: "/images/img-usdc.svg",
    coinType: USDC_COIN_TYPE,
  },
  [Currency.NOCTRA]: {
    name: "NOCTRA",
    decimals: 8,
    icon: APP_TOKEN_IMAGE,
    coinType: NOCTRA_COIN_TYPE,
  },
};

export const AGENT_CATEGORIES_OPTIONS = [
  { label: "DeFi", value: AgentType.DEFI },
  { label: "Ecommerce", value: AgentType.ECOMMERCE },
  { label: "Social", value: AgentType.SOCIAL },
  { label: "Game", value: AgentType.GAME },
  { label: "Trading", value: AgentType.TRADING },
  { label: "NFT", value: AgentType.NFT },
];
export const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
export const AUDIO_EXTENSIONS = [".mp3", ".aac", ".m4a", ".wav"];
export const WRONG_RATIO_IMAGE = 0.05;
