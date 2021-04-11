import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parse from "parse-link-header";
import { githubAPI, GetResponseDataTypeFromEndpointMethod } from "../api";

interface FetchIssuesArgs {
  organization: string;
  repository: string;
  page?: number;
}

export const fetchIssues = createAsyncThunk(
  "issues/fetchAll",
  async ({ organization, repository, page = 0 }: FetchIssuesArgs) => {
    try {
      let pageCount = 0;
      const response = await githubAPI.issues.listForRepo({
        owner: organization,
        repo: repository,
        per_page: 5,
        page,
      });

      if (response.headers.link) {
        const pageLinks = parse(response.headers.link);
        pageCount = pageLinks?.last ? parseInt(pageLinks.last.page, 10) : 0;
      }

      return {
        status: "SUCCESS",
        list:
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data,
        pageCount,
      };
    } catch (error) {
      switch (error.message) {
        case "Not Found":
          return {
            status: "NOT_FOUND",
            list: [],
            pageCount: 0,
          };
        default:
          return {
            status: "UNKNOWN_ERROR",
            list: [],
            pageCount: 0,
          };
      }
    }
  }
);

type Issues = GetResponseDataTypeFromEndpointMethod<
  typeof githubAPI.issues.listForRepo
>;

interface InitialState {
  status: "EMPTY" | "LOADING" | "LOADED" | "NOT_FOUND" | "FAILED";
  list: Issues;
  pageCount: number;
}

const initialState: InitialState = {
  status: "EMPTY",
  list: [],
  pageCount: 0,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.list = action.payload.list;
      state.pageCount = action.payload.pageCount;

      switch (action.payload.status) {
        case "SUCCESS":
          state.status = "LOADED";
          break;
        case "NOT_FOUND":
          state.status = "NOT_FOUND";
          break;
        default:
          state.status = "FAILED";
          break;
      }
    });

    builder.addCase(fetchIssues.pending, (state) => {
      state.status = "LOADING";
    });
  },
});

export const { reducer: issuesReducer } = issuesSlice;
