import React from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe("Header", () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  it("Should redirect", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    userEvent.click(screen.getByLabelText("Organization"));
    document.activeElement &&
      userEvent.type(document.activeElement, "facebook");

    userEvent.click(screen.getByLabelText("Repository"));
    document.activeElement && userEvent.type(document.activeElement, "react");

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(mockHistoryPush).toHaveBeenCalledWith("/facebook/react/1");
  });

  it("Should initiate with the route state", () => {
    render(
      <MemoryRouter initialEntries={["/facebook/react/1"]}>
        <Switch>
          <Route path="/:organization/:repository/:page" component={Header} />
        </Switch>
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("facebook")).toBeInTheDocument();
    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
  });

  it("Should not accept invalid characters", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    userEvent.click(screen.getByLabelText("Organization"));
    document.activeElement &&
      userEvent.type(document.activeElement, "facebook !@#$%^ &*()++ 🤘");

    userEvent.click(screen.getByLabelText("Repository"));
    document.activeElement &&
      userEvent.type(document.activeElement, "react ⁄€‹›ﬁ›ﬂ›‡·°‡‚· 😢");

    expect(screen.getByDisplayValue("facebook")).toBeInTheDocument();
    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
  });
});
