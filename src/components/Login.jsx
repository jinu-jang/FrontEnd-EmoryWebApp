import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import Header from "./header-footer/Header";

const Container = styled.div`
  width: 100%;
  max-width: 680px;
  text-align: center;
  margin: 0 auto;
`

const LoginDiv = styled.div`
  min-width: 480px;
  padding: 30px 0;
  form {
    margin: 0 auto;
    max-width: 320px;
  }
`;

const Login = props => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return id.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.setLogIn(true);
    // api 추가
  }

  return (
    <Container>
      <Header></Header>
      <LoginDiv>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="id" bssize="large">
            <FormLabel>ID</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </LoginDiv>
    </Container>
  );
};

export default Login;
