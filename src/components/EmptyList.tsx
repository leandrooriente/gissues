import React from "react";
import { Page } from "./Page";

export const EmptyList = (): React.ReactElement => {
  return (
    <Page>
      <div className="nes-container with-title">
        <h3 className="title">Results</h3>

        <div className="message-list">
          <div className="message">
            <div className="nes-balloon from-left">
              <p>
                Hello there! Search on the form above to get some fresh issues.
              </p>
            </div>
            <i className="nes-octocat animate"></i>
          </div>
        </div>
      </div>
    </Page>
  );
};
