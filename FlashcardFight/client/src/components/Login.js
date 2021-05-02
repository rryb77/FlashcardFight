import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container } from "nes-react"
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./login.css"

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => {
        
        alert("Invalid email or password");
      })
  };

  return (
    <div className="formContainer">
      <Container className="login">
        <Form onSubmit={loginSubmit}>
          <fieldset>
            <FormGroup>
              <Label for="email">Email</Label>
              <input id="email" type="text" class="nes-input" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <input id="password" type="password" class="nes-input" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <button class="nes-btn is-primary">Login</button>
            </FormGroup>
            <em>
              Not registered? <Link to="register">Register</Link>
            </em>
          </fieldset>
        </Form>
      </Container>
    </div>
  );
}