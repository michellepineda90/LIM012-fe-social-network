import {
  signInUser,
  signInWithGoogle,
  signInWithFacebook,
  registerUser,
} from '../model/user.model.js';

import { setErrorFor, setSuccessFor } from './utils.js';


const signInFormValidation = (code) => {
  const inputPassword = document.querySelector('#password');
  const inputEmail = document.querySelector('#email');
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  // const singInBtn = document.querySelector('#sign-in-btn');

  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Ingrese un correo Electrónico');
  } else if (code === 'auth/user-not-found') {
    setErrorFor(inputEmail, 'No hay cuenta vinculada a este email');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Ingrese una contraseña');
  } else if (code === 'auth/wrong-password') {
    setErrorFor(inputPassword, 'La contraseña es incorrecta');
  } else {
    setSuccessFor(inputPassword);
  }
};

export const eventSignIn = (event) => {
  event.preventDefault();
  const user = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  signInUser(user)
    .then((data) => {
      // window.location.replace('#/home');
      window.location.hash = '#/home';
      console.log(data);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err.code, err.message);
      signInFormValidation(err.code);
    });
};

export const eventGoogle = (event) => {
  event.preventDefault();
  signInWithGoogle()
    .then((res) => {
      const idUser = res.user.uid;
      // console.log(idUser);
      const userObj = {
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };
      registerUser(idUser, userObj);
      window.location.hash = '#/profile';
    })
    .catch();
};
export const eventFacebook = (event) => {
  event.preventDefault();
  signInWithFacebook()
    .then((res) => {
      const idUser = res.user.uid;
      // console.log(idUser);
      const userObj = {
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };
      registerUser(idUser, userObj);
      window.location.hash = '#/profile';
    })
    .catch();
};

export const hidePwd = () => {
  const password = document.querySelector('#password');
  const eyeSlash = document.querySelector('#hide-password');
  const eye = document.querySelector('#show-password');
  password.setAttribute('type', 'text');
  eyeSlash.classList.add('hide');
  eye.classList.remove('hide');
};
export const showPwd = () => {
  const password = document.querySelector('#password');
  const eyeSlash = document.querySelector('#hide-password');
  const eye = document.querySelector('#show-password');
  password.setAttribute('type', 'password');
  eyeSlash.classList.remove('hide');
  eye.classList.add('hide');
};
