import React from "react";
import { Provider } from "react-redux";
import { Routes } from "./Routes";
import { store } from "../store";
import "nes.css/css/nes.min.css";
import "./style.css";

export const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
