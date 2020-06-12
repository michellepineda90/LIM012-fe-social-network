/* eslint-disable no-console */
import { auth } from '../firebaseInit.js';

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password)
  .then(() => auth.currentUser.updateProfile({
    displayName: user.name,
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/red-social-32aa8.appspot.com/o/iconfinder_11_avatar_2754576.png?alt=media&token=454a743a-437f-4c21-8dfb-d26e33a0a806',
  }));

// export const registerUserBD = (idUser, data) => db.collection('users').doc(idUser).set(data);

export const sendConfirmationEmail = () => auth.currentUser.sendEmailVerification();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// export const currentUser = () => {
//   const user = firebase.auth().currentUser;
//   console.log(user);
//   const userData = {
//     id: user.uid,
//     name: (user.displayName === null) ? 'Anonymous' : user.displayName,
//     email: user.email,
//     photo: (user.photoURL === null) ? './img/avatar.png' : user.photoURL,
//   };
//   return userData;
// };

export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.hash = '#/login';
    })
    .catch((err) => {
      console.log(err);
    });
};
