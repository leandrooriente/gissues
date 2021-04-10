import { configureStore } from "@reduxjs/toolkit";
import { issuesReducer } from "./features/issues";

export const store = configureStore({
  reducer: {
    issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
