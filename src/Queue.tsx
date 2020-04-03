import { RouteComponentProps } from "@reach/router";
import React from "react";
import Avatar from "react-avatar";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  joinQueue,
  leaveQueue,
  useAuth,
  useMembers,
  useQueue
} from "./firebase";
import { IMember } from "./models";
import styles from "./Queue.module.css";

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
      <h1 className={styles.headline}>{queue?.name}</h1>
      {members.map(member => (
        <div className={styles.member}>
          <Avatar
            size="40"
            onClick={onLeaveQueue(member)}
            name={member.name}
            src={member.avatar}
            round
            className={styles.avatar}
          />
          <span className={styles.name}>{member.name}</span>
          <FaRegTrashAlt onClick={onJoinQueue} className={styles.kick} />
        </div>
      ))}
      <div>
        <button onClick={onJoinQueue}>Join Queue</button>
      </div>
    </div>
  );
};
