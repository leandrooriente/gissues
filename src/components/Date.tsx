import React, { Fragment, ReactText } from "react";

interface FormatedDateProps {
  children: ReactText;
}
export const FormatedDate = ({
  children,
}: FormatedDateProps): React.ReactElement => {
  const dateObj = new Date(children);
  const formatedDate = dateObj.toDateString();
  return <Fragment>{formatedDate}</Fragment>;
};
