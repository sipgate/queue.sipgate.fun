import { Link, RouteComponentProps } from "@reach/router";
import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { login, useAuth, useQueues } from "./firebase";

export const Home: React.FC<RouteComponentProps> = () => {
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
    <div>
      {queues.map(queue => (
        <Link to={`/queues/${queue.id}`}>
          <div>{queue.name}</div>
        </Link>
      ))}
    </div>
  );
};
