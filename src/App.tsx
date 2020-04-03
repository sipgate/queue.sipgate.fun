import { Router } from "@reach/router";
import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import "./App.css";
import { login, useAuth } from "./firebase";
import { Home } from "./Home";
import { Queue } from "./Queue";

function App() {
  const user = useAuth();

  if (!user) {
    return (
      <div>
        <GoogleLoginButton onClick={login} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Queues</h1>
      <Router>
        <Home path="/" />
        <Queue path={`/queues/:queueId`} />
      </Router>
    </div>
  );
}

export default App;
