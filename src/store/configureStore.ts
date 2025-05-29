import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
// import tokenReducer, { TokenState } from "./token/reducer";
import GameReducer from "./game/reducer";
import ChatAIReducer from "./chatAI/reducer";
// import { DataState, DataStateOwner, PropGameCount } from "./game";
import { reducers as MediaReducer } from "./media";
import BlogReducer from "./new/reducer";
import Auth_Login from "./auth/reducer";

export interface State {
  app: AppState;
  // token: TokenState;
}
const appReducers = combineReducers({
  app: appReducer,
  // token: tokenReducer,
  chatai: ChatAIReducer,
  blog: BlogReducer,
  auth: Auth_Login,
  game: GameReducer,
  ...MediaReducer,
});

// const rootReducer = (state: any, action: any) => {
//   if (action.type === "RESET_STORE") {
//     state = undefined;
//   }
//   return appReducers(state, action);
// };

export const store = configureStore({
  reducer: appReducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
