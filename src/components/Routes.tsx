import React from "react";
import { Switch, Route } from "react-router-dom";
import { EmptyList } from "./EmptyList";
import { List } from "./List";

export interface ListPageParamTypes {
  organization: string | undefined;
  repository: string | undefined;
  page: string;
}

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/" exact component={EmptyList} />
      <Route path="/:organization/:repository/:page" component={List} />
    </Switch>
  );
};
