import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";
import list from "./components/list";
import maintain from "./components/maintain";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={list} />
      <Route exact path="/:id(\d+)" component={maintain} />
      <Route exact path="/create" component={maintain} />
    </Router>
  </Provider>,
  document.getElementById("root")
);