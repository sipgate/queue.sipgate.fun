import { RouteComponentProps } from "@reach/router";
import React from "react";
import Avatar from "react-avatar";
import {
  joinQueue,
  leaveQueue,
  useAuth,
  useMembers,
  useQueue
} from "./firebase";
import { IMember } from "./models";

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

  const onLeaveQueue = (member: IMember) => () => {
    leaveQueue(queue?.id, member.id);
  };

  return (
    <div>
      <div onClick={onJoinQueue}>{queue?.name}</div>
      <span>
        {members.map(member => (
          <Avatar
            onClick={onLeaveQueue(member)}
            name={member.name}
            src={member.avatar}
          />
        ))}
      </span>
    </div>
  );
};
