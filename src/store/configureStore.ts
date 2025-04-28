import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
import tokenReducer, { TokenState } from "./token/reducer";
import listGameReducer, { DataState } from "./listGame/reducer";

export interface State {
  app: AppState;
  token: TokenState;
  listGame: DataState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    token: tokenReducer,
    lisgame: listGameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
