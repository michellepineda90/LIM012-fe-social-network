/* eslint-disable no-console */

import { auth, db } from '../firebaseInit.js';

export const registerUserOnDB = (key, data) => new Promise((res, rej) => {
  db.collection('users').doc(key).set(data)
    .then(res(true))
    .catch(rej(new Error('error to storage on database')));
});
// const registerUserOnDB = (key, data) => db.collection('users').doc(key).set(data);


export const createUser = user => new Promise((res, rej) => {
  auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(cred => registerUserOnDB(cred.user.uid, { name: user.name }))
    .then(result => res(result))
    .catch(err => rej(err));
});


export const signInUser = user => new Promise((res, rej) => {
  auth.signInWithEmailAndPassword(user.email, user.password)
    .then(res('success!'))
    .catch(rej(new Error('error')));
});

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};