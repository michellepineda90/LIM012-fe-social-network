

import { auth, db } from '../firebaseInit.js';

export const registerUser = (user) => {
  auth.createUserWithEmailAndPassword(user.email, user.psw)
    .then(cred => db.collection('users').doc(cred.user.uid)
      .set({ name: user.name }))
    .catch(err => console.log(err));
};


export const loginUser = (user) => {
  auth.signInWithEmailAndPassword(user.email, user.psw)
    .then(cred => console.log(cred));
};
