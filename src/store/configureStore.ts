import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
import tokenReducer, { TokenState } from "./token/reducer";
import {
  AsyncState,
  GameCount,
  ListGame,
  reducers as GameReducers,
} from "./game/reducer";
import { SignMessageProps, reducers as AuthReducers } from "./auth/reducer";
// import { DataState, DataStateOwner, PropGameCount } from "./game";

export interface State {
  app: AppState;
  token: TokenState;
  signmessage: SignMessageProps;
  game: AsyncState<ListGame[]>;
  gameCount: AsyncState<GameCount>;
  gameOwner: AsyncState<ListGame[]>;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    token: tokenReducer,
    ...AuthReducers,
    ...GameReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
