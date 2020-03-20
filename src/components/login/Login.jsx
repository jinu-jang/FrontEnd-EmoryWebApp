import React, { useState, Fragment } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import Header from "./../header-footer/Header";

const LoginDiv = styled.div`
  min-width: 480px;
  padding: 30px 0;
  form {
    margin: 0 auto;
    max-width: 320px;
  }
`;

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Fragment>
      <Header></Header>
      <LoginDiv>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bssize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
    </Fragment>
  );
};

export default Login;
