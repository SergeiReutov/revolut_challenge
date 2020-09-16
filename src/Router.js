import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Exchange } from 'components/exchange';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Exchange />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
