import { Link, RouteComponentProps } from "@reach/router";
import React, { ChangeEvent, useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { createQueue, login, useAuth, useQueues } from "./firebase";
import styles from "./Home.module.css";

export const Home: React.FC<RouteComponentProps> = () => {
  const user = useAuth();
  const queues = useQueues();
  const [name, setName] = useState("");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onCreateQueue = async () => {
    if (!name) {
      return;
    }
    await createQueue(name);
    setName("");
  };

  if (!user) {
    return (
      <div>
        <GoogleLoginButton onClick={login} />
      </div>
    );
  }

  return (
    <div>
      <h1>Queues</h1>
      {queues.map(queue => (
        <Link key={queue.id} to={`/queues/${queue.id}`}>
          <div className={styles.name}>{queue.name}</div>
        </Link>
      ))}
      <input
        type="text"
        name={name}
        onChange={onNameChange}
        placeholder="Queue Name"
      />
      <button onClick={onCreateQueue} disabled={!name}>
        Create new queue
      </button>
    </div>
  );
};
