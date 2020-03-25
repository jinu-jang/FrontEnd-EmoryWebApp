import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { publicEncrypt } from "crypto";
import Header from "./header-footer/Header";

const Container = styled.div`
  width: 100%;
  max-width: 680px;
  text-align: center;
  margin: 0 auto;
`

const ErrorSpan = styled.span`
  color: red;
  font-weight: bold;
`

const LoginDiv = styled.div`
  min-width: 480px;
  padding: 30px 0;
  form {
    margin: 0 auto;
    max-width: 320px;
  }
`;

const instance = axios.create({
  'baseURL' : 'http://localhost:3001',
  "Content-Type" : 'application/json'
});

let publicKey;
instance.get('/api/auth/login')
  .then(response => {
    publicKey = response.data.publicKey;
  })
  .catch(error => {
    console.log(error);
  });

const Login = props => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function validateForm() {
    return id.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let options = `{"username":"${id}", "password":"${password}", "client_id":"jinu_front_end"}`
    let encrypted_options = publicEncrypt(publicKey, Buffer.from(options, 'utf8')).toString("Base64");
    console.log(encrypted_options)

    instance.post('/api/auth/login', {
      "encrypted_options": encrypted_options
    })
    .then(response => {
      props.setLoginToken(response.data.token);
      setError(false);
    })
    .catch(error => {
      console.log(`[Login] Error Code ${error.status}: ${error.data.message}`);
      setError(true);
    })
  }

  return (
    <Container>
      <Header></Header>
      {error && <ErrorSpan>Log-in Failure</ErrorSpan>}
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
