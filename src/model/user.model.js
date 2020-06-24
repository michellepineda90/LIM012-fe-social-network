/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';
import { objToArray } from '../utils/array.js';
import { profileDefault } from '../controller/utils.js';


export const getInfoUserBD = id => db.collection('users').doc(id).get();

export const getCurrentUser = () => auth.currentUser;

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const registerUserBD = (idUser, data) => db.collection('users').doc(idUser).set(data);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password)
  .then(() => auth.currentUser.updateProfile({
    displayName: user.name,
    photoURL: profileDefault,
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
    })
    .catch((err) => {
      console.log(err);
    });
};


export const updateImgCoverUser = (url, id) => {
  console.log(url, id);
  db.collection('users').doc(id).update({ coverPhoto: url })
    .then(() => console.log('cover photo updated!!'))
    .catch(err => console.log('Error to update cover photo!!', err));
};
