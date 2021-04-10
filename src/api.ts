import { Octokit } from "@octokit/rest";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

export type { GetResponseDataTypeFromEndpointMethod };
const config = {
  ...(process.env.REACT_APP_GH_KEY
    ? {
        auth: process.env.REACT_APP_GH_KEY,
      }
    : {}),
};
export const githubAPI = new Octokit(config);
