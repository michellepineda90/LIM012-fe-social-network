/* eslint-disable no-console */
import {
  signInUser,
  signInWithGoogle,
  signInWithFacebook,
  registerUser,
} from '../model/user.model.js';

import { setErrorFor, setSuccessFor, sendMessage } from './utils.js';
import { auth } from '../firebaseInit.js';


const signInFormValidation = (code) => {
  const inputPassword = document.querySelector('#password');
  const inputEmail = document.querySelector('#email');
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Por favor, ingrese un correo');
  } else if (code === 'auth/user-not-found') {
    sendMessage('No existe una cuenta vinculada a este correo');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Por favor, ingrese contraseña');
  } else if (code === 'auth/wrong-password') {
    setErrorFor(inputPassword, 'La contraseña   es incorrecta');
  } else {
    setSuccessFor(inputPassword);
  }
};

const { log } = console;

export const eventSignIn = (event) => {
  event.preventDefault();
  const user = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  signInUser(user)
    .then(() => {
      if (auth.currentUser.emailVerified === true) {
        window.location.hash = '#/home';
        event.target.reset();
      } else {
        sendMessage('Necesitas confirmar tu cuenta');
      }
    })
    .catch((err) => {
      log(err.code, err.message);
      signInFormValidation(err.code);
    });
};


export const eventGoogle = (event) => {
  event.preventDefault();
  signInWithGoogle()
    .then((res) => {
      const idUser = res.user.uid;
      const userObj = {
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };
      registerUser(idUser, userObj);
      window.location.hash = '#/home';
    })
    .catch();
};
export const eventFacebook = (event) => {
  event.preventDefault();
  signInWithFacebook()
    .then((res) => {
      const idUser = res.user.uid;
      const userObj = {
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };
      registerUser(idUser, userObj);
      window.location.hash = '#/home';
    })
    .catch();
};
