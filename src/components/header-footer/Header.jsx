import React from "react";
import logo from '../../img/title.png';

const Header = () => {
    return (
        <div id="header-wrapper">
            <div id="header">
                <img class="header-image" src={logo} alt="Emory Logo"/>
                <div id="explanation">
                   <b>How to use</b>
                </div>
            </div>
        </div>
    );
};

export default Header;


    