/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const registerUser = (key, data) => db.collection('users').doc(key).set(data);

export const signInUser = user => (
  auth.signInWithEmailAndPassword(user.email, user.password));

// export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password)
//   .then(cred => registerUser(cred.user.uid, { name: user.name }));
export const sendEmail = () => {
  console.log('curren user is: ', auth.currentUser);
  auth.currentUser.sendEmailVerification();
};

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password)
  .then(() => {
    sendEmail();
    registerUser(auth.currentUser.uid, { name: user.name });
  });

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
