/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const updateProfileUser = data => auth.currentUser.updateProfile(data);

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password);

export const registerUserBD = (idUser, data) => db.collection('users').doc(idUser).set(data);

export const sendConfirmationEmail = () => auth.currentUser.sendEmailVerification();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const getCurrentUser = () => auth.currentUser;


export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.hash = '#/login';
    })
    .catch((err) => {
      console.log(err);
    });
};
