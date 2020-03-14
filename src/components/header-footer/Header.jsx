import React from "react";
import logo from '../../img/title.png';

const Header = () => {
    return (
        <Fragment>
        <img class="header-image" src={logo} alt="Emory Logo"/>
        <div id="explanation">
           <b>How to use</b>
        </div>
        </Fragment>
    );
};

export default Header;


