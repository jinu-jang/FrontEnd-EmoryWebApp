import React from "react";
import styled from "styled-components";
import Header from "./header-footer/Header";
import Dropzone from "./dragdrop/Dropzone";
import Footer from "./header-footer/Footer";

const Container = styled.div`
  width: 100%;
  max-width: 680px;
  text-align: center;
  margin: 0 auto;
`;

const Upload = props => {
  return (
    <Container>
      <Header />
      <Dropzone loginToken={props.loginToken} />
      <Footer />
    </Container>
  );
};

export default Upload;
