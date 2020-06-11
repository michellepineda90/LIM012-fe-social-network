/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const signInUser = user => auth.signInWithEmailAndPassword(user.email, user.password);

export const createUser = user => auth.createUserWithEmailAndPassword(user.email, user.password);

export const registerUserBD = (idUser, data) => db.collection('users').doc(idUser).set(data);

// export const getUsers = () => db.collection('users').onSnapshot((data)
// => { console.log(data.docs[0].data()); });

export const getUsers = db.collection('users').onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    console.log(change.doc.data());
  });
});

export const sendConfirmationEmail = () => auth.currentUser.sendEmailVerification();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  const userData = {
    id: user.uid,
    name: (user.displayName === null) ? 'Anonimo' : user.displayName,
    email: user.email,
    photo: (user.photoURL === null) ? './img/avatar.png' : user.photoURL,
  };
  return userData;
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
