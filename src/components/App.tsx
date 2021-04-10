import { BrowserRouter } from "react-router-dom";

import { Header } from "./Header";
import { Routes } from "./Routes";
import "nes.css/css/nes.min.css";
import "./style.css";

export const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
};
