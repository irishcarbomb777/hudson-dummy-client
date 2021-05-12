import React from "react";
import { Route, Switch } from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {NotFound} from "./pages/NotFound";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      <Route exact path='/login'>
        <Login/>
      </Route>
      <Route exact path='/simulator'>
        <Home/>
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}