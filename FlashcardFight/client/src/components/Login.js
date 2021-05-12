import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Button } from "nes-react"
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
    <div className="loginBGContainer">
        <div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Container className="login is-dark">
                    <Form className="loginForm" onSubmit={loginSubmit}>
                        <fieldset>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" className="nes-input" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" className="nes-input" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button className="nes-btn is-primary">Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="register">Register</Link>
                        </em>
                        </fieldset>
                    </Form>
                    </Container>
                </div>
            </div>
    </div>
  );
}