import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import "./App.css";
import { joinQueue, login, useAuth, useQueues } from "./firebase";
import { Queue } from "./models";

function App() {
  const user = useAuth();
  const queues = useQueues();

  const onJoinQueue = (queue: Queue) => () => {
    if (!user) {
      return;
    }

    joinQueue(queue.id, user);
  };

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
        <div onClick={onJoinQueue(queue)}>{queue.name}</div>
      ))}
    </div>
  );
}

export default App;
