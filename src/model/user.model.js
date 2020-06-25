/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const coverDefault = 'https://firebasestorage.googleapis.com/v0/b/red-social-32aa8.appspot.com/o/eco-chat%2Fportada-default.jpg?alt=media&token=f49f27dd-c7c0-46c2-b5df-8fea641cbc9f';
const profileDefault = 'https://firebasestorage.googleapis.com/v0/b/red-social-32aa8.appspot.com/o/eco-chat%2Fuser-photo-profile.png?alt=media&token=064cb92b-ebbe-4de0-baa4-15d68c1f0e9d';

export const getInfoUserBD = id => db.collection('users').doc(id).get();

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const registerUserBD = (idUser, data) => db.collection('users').doc(idUser).set(data);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password)
  .then(() => auth.currentUser.updateProfile({
    displayName: user.name,
    photoURL: profileDefault,
  }).then(() => {
    registerUserBD(auth.currentUser.uid, { coverPhoto: coverDefault, aboutMe: '' });
  }));


export const getUsers = () => db.collection('users').get().then(snapshot => objToArray(snapshot.data));

export const sendConfirmationEmail = () => auth.currentUser.sendEmailVerification();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};


export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.hash = '#/login';
    });
};


export const updateImgCoverUser = (url, id) => {
  console.log(url, id);
  db.collection('users').doc(id).update({ coverPhoto: url });
};
