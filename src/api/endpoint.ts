export const Endpoint = {
  UPLOAD: "/upload",

  RECOMMEND_AGENTS: "/agents/marquee-agents",

  AUTH_SIGNMESSAGE: "/auth/signature-message",

  GET_GAME: "/game",
  GET_GAME_OWNER: "/game/owner",
  GET_GAME_COUNT: "/game/count",
  CREATE_GAME: "/game/create",
  UPDATE_GAME: "/game/update",
  GET_GAME_ID: "/game/{id}",
  DELETE_GAME: "/game/delete",
  CREATE_GAME_REVIEW: "game/rate",
  DELETE_OWNER: "/game/owner/delete",
  GET_GENRES: "/game/genres",
  GET_GENRES_BY_ID: "/game/genre",
  CREATE_GENRES: "/game/genres/create",
  UPDATE_GENRES: "/game/genres/update",
  DELETE_GENRES: "/game/genre/delete",
  CREATE_RATE: "/game/rate",
  OWNER_REVIEW: "/game/owner/review",

  GALLERY: "/gallery",

  AUTH_WALLET: "/auth",

  GET_URL_X: "/auth/twitter/callback",
  LOGIN_X: "/auth/auth-x",
  LOGIN_GOOGLE: "/auth/auth-google",
  LOGIN_ACCOUNT: "/auth/auth",

  ASK_HISTORIES: "/{threadId}/histories",

  GET_BLOG: "web/blog",
  POST_CREATE_BLOG: "/blog/create",
  PATCH_UPDATE_BLOG: "/blog/udpate",
  DELETE_BLOG: "/blog/delete",
  GET_PROFILE: "/user/profile",
};
