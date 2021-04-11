import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { App } from "../components/App";

const renderApp = (initialRoute = "/"): ReturnType<typeof render> => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

export { renderApp };
