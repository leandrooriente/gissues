import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";
import { List } from "./List";
import "nes.css/css/nes.min.css";
import "./style.css";

export const App = (): React.ReactElement => {
  const state: "NOT_FOUND" | "LOADED" | "LOADING" | "EMPTY" = "LOADED";
  return (
    <BrowserRouter>
      <Header />
      {state === "EMPTY" ? <EmptyList /> : null}
      {state === "NOT_FOUND" ? <NotFound /> : null}
      {state === "LOADING" ? <Loading /> : null}
      {state === "LOADED" ? <List /> : null}
    </BrowserRouter>
  );
};
