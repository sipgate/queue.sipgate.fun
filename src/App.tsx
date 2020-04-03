import React from "react";
import "./App.css";
import { useAuth, useQueues } from "./firebase";

function App() {
  const user = useAuth();
  const queues = useQueues();

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
