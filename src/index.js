import React from "react";
import ReactDOM from "react-dom";
// import "./main.css";
import Header from "./components/header-footer/Header";
import Footer from "./components/header-footer/Footer";

const App = () => (
    <div>
        <Header />
        <Footer />
    </div>

)

ReactDOM.render(<App />, document.getElementById("root"));
