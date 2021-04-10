import React, { Fragment } from "react";

export const NotFound = (): React.ReactElement => {
  return (
    <Fragment>
      <i className="nes-icon is-large heart"></i>
      <i className="nes-icon is-large heart"></i>
      <i className="nes-icon is-large heart"></i>
      <i className="nes-icon is-large is-half heart"></i>
      <i className="nes-icon is-large is-transparent heart"></i>

      <p>
        Sorry, but either this repository doesn't exist or it doesn't have any
        issues.
      </p>

      <p>
        Try another combination like "facebook/react". There is a lot of issues
        there.
      </p>
    </Fragment>
  );
};
