import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import "./App.css";
import { login, useAuth, useQueues } from "./firebase";

function App() {
  const user = useAuth();
  const queues = useQueues();

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
      {queues.map(queue => (
        <div>{queue.name}</div>
      ))}
    </div>
  );
}

export default App;
