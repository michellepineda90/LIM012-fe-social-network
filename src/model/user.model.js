/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password);

export const registerUser = (idUser, data) => db.collection('users').doc(idUser).set(data);

export const getUsers = callback => db.collection('users')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ idUser: doc.idUser, ...doc.data() });
    });
    callback(data);
  });

export const sendEmail = () => auth.currentUser.sendEmailVerification();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
