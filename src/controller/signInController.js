/* eslint-disable no-console */
import { views } from '../view/index.js';

import {
  signInUser,
  signInWithGoogle,
  signInWithFacebook,
  registerUserBD,
  coverDefault,
} from '../model/user.model.js';

import {
  signInFormValidation,
  sendMessage, hidePwd, showPwd,
} from '../utils/utils.js';

import { auth } from '../firebaseInit.js';

const eventSignIn = (event) => {
  event.preventDefault();
  const userObj = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  signInUser(userObj)
    .then(() => {
      if (auth.currentUser.emailVerified === true) {
        window.location.hash = '#/home';
        event.target.reset();
      } else {
        sendMessage('Necesitas confirmar tu cuenta');
      }
    })
    .catch((err) => {
      console.log(err.code, err.message);
      signInFormValidation(err.code);
    });
};


const eventGoogle = (event) => {
  event.preventDefault();
  signInWithGoogle()
    .then((res) => {
      registerUserBD(res.user.uid, { coverPhoto: coverDefault, aboutMe: '' });
      window.location.hash = '#/home';
    })
    .catch();
};

const eventFacebook = (event) => {
  event.preventDefault();
  signInWithFacebook()
    .then((res) => {
      registerUserBD(res.user.uid, { coverPhoto: coverDefault, aboutMe: '' });
      window.location.hash = '#/home';
    })
    .catch();
};

export default () => {
  const currentView = views.signInView();

  const singInForm = currentView.querySelector('#sign-in-form');
  singInForm.addEventListener('submit', (event) => {
    eventSignIn(event);
  });

  const authGoogle = currentView.querySelector('#btn-google');
  authGoogle.addEventListener('click', eventGoogle);

  const authFacebook = currentView.querySelector('#btn-facebook');
  authFacebook.addEventListener('click', eventFacebook);

  const hidePassword = currentView.querySelector('#hide-password');
  hidePassword.addEventListener('click', hidePwd);

  const showPassword = currentView.querySelector('#show-password');
  showPassword.addEventListener('click', showPwd);

  return currentView;
};
