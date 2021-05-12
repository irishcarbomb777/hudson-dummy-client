import React from "react";

import { Auth } from 'aws-amplify';
import { useAuthenticationContext } from "../hooks/contextHooks";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../hooks/useFormFields"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export const Login = () => {
  // Special Hooks
  const { setLoginAuthenticated } = useAuthenticationContext();   // Pull context from App.js
  const history = useHistory();   // Initiate the useHistory React Hook

  // State Hooks
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();   // Stop page from reloading on submit (React Built in)

    try {
      await Auth.signIn(fields.username, fields.password); // Send User Pool login credentials to Auth
      setLoginAuthenticated(true);         // Set User Session context flag to true
      history.push("/dashboard");                  // Push the "/" path to history to redirect          
    } catch (e) {
      onError(e);
    }    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}