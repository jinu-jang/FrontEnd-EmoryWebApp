import React from "react";
import styled from "styled-components";
import logo from "../../img/title.png";

const Logo = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
`;

const Header = () => {
  return <Logo src={logo} alt="Emory Logo" />;
};

export default Header;
