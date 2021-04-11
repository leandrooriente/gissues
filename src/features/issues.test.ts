import fetchMock from "jest-fetch-mock";
import { configureStore } from "@reduxjs/toolkit";
import { issuesReducer, fetchIssues } from "./issues";

describe("issues reducer", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Should initiate the store", () => {
    const store = configureStore({ reducer: { issuesReducer } });
    const state = store.getState();

    expect(state).toEqual({
      issuesReducer: {
        status: "EMPTY",
        list: [],
        pageCount: 0,
      },
    });
  });

  it("Should fetch issues", async () => {
    const store = configureStore({ reducer: { issuesReducer } });
    const issue = { foo: "bar" };
    const pageCount = 10;
    fetchMock.mockResponseOnce((_) =>
      Promise.resolve({
        body: JSON.stringify([issue]),
        headers: {
          link: `<https://api.github.com/repositories/0/issues?per_page=5&page=${pageCount}>; rel="last"`,
        },
      })
    );

    const dispatchedAction = store.dispatch(
      fetchIssues({
        organization: "facebook",
        repository: "react",
        page: 0,
      })
    );

    expect(store.getState()).toEqual({
      issuesReducer: {
        status: "LOADING",
        list: [],
        pageCount: 0,
      },
    });

    await dispatchedAction;

    expect(store.getState()).toEqual({
      issuesReducer: {
        status: "LOADED",
        list: [issue],
        pageCount,
      },
    });
  });

  it("Should handle Not Found API error", async () => {
    const store = configureStore({ reducer: { issuesReducer } });
    fetchMock.mockRejectOnce(new Error("Not Found"));

    await store.dispatch(
      fetchIssues({
        organization: "facebook",
        repository: "react",
        page: 0,
      })
    );

    expect(store.getState()).toEqual({
      issuesReducer: {
        status: "NOT_FOUND",
        list: [],
        pageCount: 0,
      },
    });
  });

  it("Should handle Unknown errors", async () => {
    const store = configureStore({ reducer: { issuesReducer } });
    fetchMock.mockRejectOnce(new Error("Ops, something went wrong!"));

    await store.dispatch(
      fetchIssues({
        organization: "facebook",
        repository: "react",
        page: 0,
      })
    );

    expect(store.getState()).toEqual({
      issuesReducer: {
        status: "FAILED",
        list: [],
        pageCount: 0,
      },
    });
  });
});
