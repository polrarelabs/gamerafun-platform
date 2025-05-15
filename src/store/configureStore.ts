/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
import tokenReducer, { TokenState } from "./token/reducer";
import {
  AsyncState,
  GameCount,
  ListGame,
  reducers as GameReducers,
} from "./game/reducer";
import { SignMessageProps, reducers as AuthReducers } from "./auth/reducer";
import { reducers as ChatAIReducer } from "./chatAI";
// import { DataState, DataStateOwner, PropGameCount } from "./game";
import { reducers as MediaReducer } from "./media";
export interface State {
  app: AppState;
  token: TokenState;
  signmessage: SignMessageProps;
  game: AsyncState<ListGame[]>;
  gameCount: AsyncState<GameCount>;
  gameOwner: AsyncState<ListGame[]>;
}

// export const store = configureStore({
//   reducer: {
//     app: appReducer,
//     token: tokenReducer,
//     ...AuthReducers,
//     ...GameReducers,
//     ...ChatAIReducer,
//     ...MediaReducer,
//   },
// });

const appReducers = combineReducers({
  app: appReducer,
  token: tokenReducer,
  ...AuthReducers,
  ...GameReducers,
  ...ChatAIReducer,
  ...MediaReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
