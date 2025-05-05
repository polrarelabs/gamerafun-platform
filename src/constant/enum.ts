export enum DataStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
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
  NOCTRA = "NOCTRA",
  APT = "APT",
  USDC = "USDC",
}

export enum Platform {
  EPIC = "EPIC",
  STEAM = "STEAM",
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

export enum ScheduleStatus {
  PLAYABLE = "Playable",
  BETA = "Beta",
  ALPHA = "Alpha",
  INDEVELOPMENT = "InDevelopment",
}
