import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import Header from "./components/header-footer/Header";
import Footer from "./components/header-footer/Footer";


ReactDOM.render(<Header />, document.getElementById("header"));
ReactDOM.render(<Footer />, document.getElementById("footer"));
