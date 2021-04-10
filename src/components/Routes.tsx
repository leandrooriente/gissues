import { Switch, Route } from "react-router-dom";
import { EmptyList } from "./EmptyList";
import { List } from "./List";

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/" exact component={EmptyList} />
      <Route path="/:organization/:repository" component={List} />
    </Switch>
  );
};
