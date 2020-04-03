import { Link, RouteComponentProps } from "@reach/router";
import React, { ChangeEvent, useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { createQueue, login, useAuth, useQueues } from "./firebase";

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
      {queues.map(queue => (
        <Link to={`/queues/${queue.id}`}>
          <div>{queue.name}</div>
        </Link>
      ))}
      <input type="text" name={name} onChange={onNameChange} />
      <button onClick={onCreateQueue}>Create new queue</button>
    </div>
  );
};
