import { RouteComponentProps } from "@reach/router";
import React from "react";
import Avatar from "react-avatar";
import { joinQueue, useAuth, useMembers, useQueue } from "./firebase";

interface Props extends RouteComponentProps {
  queueId?: string;
}

export const Queue: React.FC<Props> = ({ queueId }) => {
  const user = useAuth();
  const queue = useQueue(queueId);
  const members = useMembers(queueId);

  if (!user || !queue) {
    // TODO: Redirect to Home
    return <div>Queue not found</div>;
  }

  const onJoinQueue = () => {
    joinQueue(queue?.id, user);
  };

  return (
    <div>
      <div onClick={onJoinQueue}>{queue?.name}</div>
      <span>
        {members.map(member => (
          <Avatar name={member.name} src={member.avatar} />
        ))}
      </span>
    </div>
  );
};
