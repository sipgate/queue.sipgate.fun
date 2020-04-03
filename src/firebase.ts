import { auth } from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { Queue } from "./models";

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

export const useQueues = () => {
  const [queues, setQueues] = useState<Queue[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`queues`)
      .onSnapshot(({ docs }) =>
        setQueues(
          docs.map(d => ({
            id: d.id,
            ...(d.data() as Queue)
          }))
        )
      );
  }, []);

  return queues;
};
