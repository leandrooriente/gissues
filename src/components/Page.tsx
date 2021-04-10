import React, { Fragment } from "react";
import { Header } from "./Header";

interface PageProps {
  children: JSX.Element[] | JSX.Element;
}

export const Page = ({ children }: PageProps): React.ReactElement => {
  return (
    <Fragment>
      <Header />
      <main className="wrap results">{children}</main>
    </Fragment>
  );
};
