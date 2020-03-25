import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";
import Upload from "./components/Upload";

const Routes = appProps => {
  const [loginToken, setLoginToken] = useState("");

  return (
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={props =>
            !loginToken ? <Redirect to="/" /> : <Redirect to="/upload" />
          }
        />

        <AppliedRoute
          exact
          path="/"
          component={Login}
          appProps={{ loginToken, setLoginToken }}
        />
        <AppliedRoute
          exact
          path="/upload"
          component={Upload}
          appProps={{ loginToken, setLoginToken }}
        />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
