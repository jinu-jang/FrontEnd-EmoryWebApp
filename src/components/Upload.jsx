import React from "react";
import Header from "./header-footer/Header";
import Dropzone from "./dragdrop/Dropzone";
import Footer from "./header-footer/Footer";

const Upload = () => (
    <div className="container">
        <Header/>
        <Dropzone/>
        <Footer/>
    </div>
)

export default Upload;
