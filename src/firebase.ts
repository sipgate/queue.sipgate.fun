import { auth } from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { IMember, IQueue } from "./models";

const firebaseConfig = {
  apiKey: "AIzaSyBKE0OJI23qN56KzB7BRTDkjdA-AUX6bcc",
  authDomain: "queue-sipgate-fun.firebaseapp.com",
  databaseURL: "https://queue-sipgate-fun.firebaseio.com",
  projectId: "queue-sipgate-fun",
  storageBucket: "queue-sipgate-fun.appspot.com",
  messagingSenderId: "744318312118",
  appId: "1:744318312118:web:add9ecf75c300a56f35017"
};

firebase.initializeApp(firebaseConfig);

export const login = () =>
  auth().signInWithRedirect(new auth.GoogleAuthProvider());

export const logout = () => {
  auth().signOut();
};

export const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    auth().onAuthStateChanged(async (authUser: firebase.User | null) => {
      console.log("Auth changed", authUser);
      setUser(authUser);
      if (authUser) {
        console.log("User is logged in!");
      } else {
        console.log("User is logged out!");
      }
    });
  }, [setUser]);

  return user;
};

export const createQueue = async (name: string) => {
  return firebase.firestore().collection(`queues`).add({
    name
  });
};

export const joinQueue = async (id: string, user: firebase.User) => {
  return firebase.firestore().doc(`queues/${id}/members/${user.uid}`).set({
    id: user.uid,
    name: user.displayName,
    avatar: user.photoURL
  });
};

export const leaveQueue = async (queueId: string, userId: string) => {
  return firebase
    .firestore()
    .doc(`queues/${queueId}/members/${userId}`)
    .delete();
};

export const useQueues = () => {
  const [queues, setQueues] = useState<IQueue[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`queues`)
      .onSnapshot(({ docs }) =>
        setQueues(
          docs.map(d => ({
            id: d.id,
            ...(d.data() as IQueue)
          }))
        )
      );
  }, []);

  return queues;
};

export const useQueue = (queueId?: string) => {
  const [queue, setQueue] = useState<IQueue>();

  useEffect(() => {
    if (!queueId) {
      setQueue(undefined);
      return;
    }

    firebase
      .firestore()
      .doc(`queues/${queueId}`)
      .onSnapshot(doc =>
        setQueue({
          id: doc.id,
          ...(doc.data() as IQueue)
        })
      );
  }, [queueId]);

  return queue;
};

export const useMembers = (queueId?: string) => {
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`queues/${queueId}/members`)
      .onSnapshot(({ docs }) =>
        setMembers(
          docs.map(d => ({
            id: d.id,
            ...(d.data() as IMember)
          }))
        )
      );
  }, [queueId]);

  return members;
};
