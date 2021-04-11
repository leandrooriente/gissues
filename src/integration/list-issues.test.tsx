import fetchMock from "jest-fetch-mock";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./render-integration-app";

describe("ForgotPassword Integration", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("Should render a title, the search form, and the welcome message", async () => {
    renderApp("/");

    expect(
      screen.getByRole("heading", { level: 1, name: "GISSUES" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Repository")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();

    expect(
      screen.getByText(
        "Hello there! Search on the form above to get some fresh issues."
      )
    ).toBeInTheDocument();
  });

  it("Should show a not found message for inexisting repos or repos without issues", async () => {
    fetchMock.mockRejectOnce(new Error("Not Found"));

    renderApp("/no-org/no-repo/1");

    expect(
      await screen.findByRole("heading", { level: 3, name: "Not found" })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        "Sorry, but either this repository doesn't exist or it doesn't have any issues."
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Try another combination like "facebook/react". There is a lot of issues there.'
      )
    ).toBeInTheDocument();
  });

  it("Should render issues on the result page", async () => {
    fetchMock.mockResponseOnce((_) =>
      Promise.resolve({
        body: JSON.stringify([
          {
            id: 854999068,
            number: 21229,
            title:
              "Fix: Don't flush discrete updates at end of `batchedUpdates`, only legacy sync updates",
            user: { login: "acdlite", id: 3624098 },
            labels: [{ id: 196858374, name: "CLA Signed" }],
            state: "open",
            created_at: "2021-04-10T06:54:45Z",
          },
          {
            id: 854860621,
            number: 21224,
            title: "[Fizz] Fragments and Iterable support",
            user: { login: "yekver", id: 1935877 },
            labels: [{ id: 155984160, name: "Status: Unconfirmed" }],
            state: "open",
            created_at: "2021-04-09T21:19:19Z",
          },
        ]),
        headers: {
          link:
            '<https://api.github.com/repositories/10270250/issues?per_page=5&page=2>; rel="next", <https://api.github.com/repositories/10270250/issues?per_page=5&page=139>; rel="last"',
        },
      })
    );

    renderApp("/");

    userEvent.click(screen.getByLabelText("Organization"));
    document.activeElement &&
      userEvent.type(document.activeElement, "facebook");

    userEvent.click(screen.getByLabelText("Repository"));
    document.activeElement && userEvent.type(document.activeElement, "react");

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(
      await screen.findByRole("heading", { level: 3, name: "Loading" })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { level: 3, name: "Results" })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        level: 4,
        name:
          "Fix: Don't flush discrete updates at end of `batchedUpdates`, only legacy sync updates",
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        level: 4,
        name: "[Fizz] Fragments and Iterable support",
      })
    ).toBeInTheDocument();
  });

  it("Should be able to navigate", async () => {
    fetchMock.mockResponseOnce((_) =>
      Promise.resolve({
        body: JSON.stringify([
          {
            id: 854999068,
            number: 21229,
            title: "First page issue",
            user: { login: "acdlite", id: 3624098 },
            labels: [],
            state: "open",
            created_at: "2021-04-10T06:54:45Z",
          },
        ]),
        headers: {
          link:
            '<https://api.github.com/repositories/10270250/issues?per_page=5&page=2>; rel="next", <https://api.github.com/repositories/10270250/issues?per_page=5&page=2>; rel="last"',
        },
      })
    );

    renderApp("/facebook/react/1");

    userEvent.click(screen.getByRole("link", { name: "Next page" }));

    fetchMock.mockResponseOnce((_) =>
      Promise.resolve({
        body: JSON.stringify([
          {
            id: 854999068,
            number: 21229,
            title: "Second page issue",
            user: { login: "acdlite", id: 3624098 },
            labels: [],
            state: "open",
            created_at: "2021-04-10T06:54:45Z",
          },
        ]),
        headers: {
          link:
            '<https://api.github.com/repositories/10270250/issues?per_page=5&page=1>; rel="prev", <https://api.github.com/repositories/10270250/issues?per_page=5&page=2>; rel="last"',
        },
      })
    );

    userEvent.click(screen.getByRole("link", { name: "Next page" }));

    await waitFor(() =>
      expect(
        screen.queryByRole("link", { name: "Next page" })
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByRole("link", { name: "Previous page" })
    ).toBeInTheDocument();
  });
});
