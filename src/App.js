import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Course from "./pages/Course";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/course/user/:id" component={Course} />
      </Switch>
    </Router>
  );
};

export default App;
