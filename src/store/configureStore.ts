import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
import tokenReducer, { TokenState } from "./token/reducer";
import getGameReducer, { DataState } from "./game/reducer";
import getGameOwnerReducer, { DataStateOwner } from "./game-owner/reducer";
import getGameCountReducer, { PropGameCount } from "./game-count/reducer";
import SignMessageReducer, { SignMessageProps } from "./sign-message/reducer";

export interface State {
  app: AppState;
  token: TokenState;
  getGame: DataState;
  getGameOwner: DataStateOwner;
  getGameCount: PropGameCount;
  signmessage: SignMessageProps;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    token: tokenReducer,
    getGame: getGameReducer,
    getGameOwner: getGameOwnerReducer,
    getGameCount: getGameCountReducer,
    signmessage: SignMessageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
