import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./main.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import AppliedRoute from "./components/AppliedRoute";
import Header from "./components/header-footer/Header";
import Dropzone from "./components/dragdrop/Dropzone";
import Footer from "./components/header-footer/Footer";

const Routes = appProps => {
  const [loggedIn, setLogIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={props =>
            !loggedIn ? <Redirect to="/" /> : <Redirect to="/upload" />
          }
        />

        <AppliedRoute
          exact
          path="/"
          component={Login}
          appProps={{ loggedIn, setLogIn }}
        />
        <AppliedRoute
          exact
          path="/upload"
          component={Dropzone}
          appProps={{ loggedIn, setLogIn }}
        />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
