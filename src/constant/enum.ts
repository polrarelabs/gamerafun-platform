export enum DataStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

export enum PlatformType {
  DESKTOP = 1,
  MOBILE = 2,
  WEB = 3,
}

export enum AgentType {
  DEFI = "DEFI",
  ECOMMERCE = "ECOMMERCE",
  SOCIAL = "SOCIAL",
  GAME = "GAME",
  TRADING = "TRADING",
  NFT = "NFT",
}

export enum AgentState {
  PROTOTYPE = 1,
  SENTIENT,
}

export enum TradeMode {
  BUY,
  SELL,
}

export enum Currency {
  GAMERA = "GAMERA",
  APT = "APT",
  USDC = "USDC",
}

export enum Platform {
  WINDOWS = "WINDOWS",
  MACOS = "MACOS",
  ANDROID = "ANDROID",
  WEB = "WEB",
  IOS = "IOS",
  STEAM = "STEAM",
  EPIC_GAMES = "EPIC GAMES",

  XBOX = "XBOX",
  ELIXIR = "ELIXIR",
  ULTRA = "ULTRA",
  PLAYSTATION = "PLAYSTATION",
}
export enum Genre {
  ACTION = "ACTION",
  ADVENTURE = "ADVENTURE",
  RPG = "RPG",
  STRATEGY = "STRATEGY",
  PUZZLE = "PUZZLE",
  CASUAL = "CASUAL",
  MULTIPLAYER = "MULTIPLAYER",
  SPORTS = "SPORTS",
  SHOOTER = "SHOOTER",
  RACING = "RACING",
  FIGHTING = "FIGHTING",
  MMORPG = "MMORPG",
  METAVERSE = "METAVERSE",
  FREETOPLAY = "FREETOPLAY",
  ONCHAIN = "ONCHAIN",
  CARD = "CARD",
  BATTLEROYALE = "BATTLEROYALE",
  AUTOBATTLER = "AUTOBATTLER",
}

export enum SupportOs {
  WINDOWS = "WINDOWS",
  MAC = "MAC",
  WEB = "WEB",
  ANDROID = "ANDROID",
  IOS = "IOS",
}

export enum SupportChain {
  BscTestnet = "BSC_TESTNET",
  BscMainnet = "BSC_MAINNET",
  EthereumMainnet = "ETHEREUM_MAINNET",
  PolygonMainnet = "POLYGON_MAINNET",
  AvalancheMainnet = "AVALANCHE_MAINNET",
  ArbitrumMainnet = "ARBITRUM_MAINNET",
  OptimismMainnet = "OPTIMISM_MAINNET",
  FantomMainnet = "FANTOM_MAINNET",
  AuroraMainnet = "AURORA_MAINNET",
  BaseMainnet = "BASE_MAINNET",
}

export enum MediaPosition {
  COVER = "cover",
  TRAILER = "trailer",
  SCREENSHOT = "screenshot",
}

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export enum Tag {
  GAME_UPDATE = "GAME UPDATE",
  PRESS_RELEASE = "PRESS RELEASE",
  PARTNERSHIPS = "PARTNERSHIPS",
  INVESTMENTS = "INVESTMENTS",
  REPOSTS = "REPOSTS",
  SPONSORED = "SPONSORED",
  EDUCATIONAL = "EDUCATIONAL",
  GAM3_AWARDS = "GAM3 AWARDS",
  ANNOUNCEMENTS = "ANNOUNCEMENTS",
  INTERVIEWS = "INTERVIEWS",
  EVENT_SUMMARY = "EVENT SUMMARY",
  BEST_OF = "BEST OF",
  G3 = "G3",
  CREATOR_ACADEMY = "CREATOR ACADEMY",
  LISTS = "LISTS",
  FIRST_IMPRESSIONS = "FIRST IMPRESSIONS",
  OPINION = "OPINION",
}

export enum StatusBlog {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export enum SortBy {
  TopRated = "TopRated",
  Oldest = "Oldest",
  Newest = "Newest",
  AZ = "AZ",
  ZA = "ZA",
}

export enum AddedDateSort {
  AllTime = "AllTime",
  Days7 = "7days",
  Days30 = "30days",
  Months6 = "6months",
  Months12 = "12months",
}

export enum ScheduleStatus {
  Playable = "Playable",
  Beta = "Beta",
  Alpha = "Alpha",
  InDevelopment = "InDevelopment",
  Discontinued = "Discontinued",
  TBA = "TBA",
}

export enum OwnerStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
