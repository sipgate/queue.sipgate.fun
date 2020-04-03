import { Router } from "@reach/router";
import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import styles from "./App.module.css";
import { login, useAuth } from "./firebase";
import { Home } from "./Home";
import { Queue } from "./Queue";

function App() {
  const user = useAuth();

  if (!user) {
    return (
      <div className={styles.root}>
        <div>
          <GoogleLoginButton onClick={login} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Router>
        <Home path="/" />
        <Queue path={`/queues/:queueId`} />
      </Router>
    </div>
  );
}

export default App;
