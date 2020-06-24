import { createUser, sendConfirmationEmail, registerUserBD} from '../model/user.model.js';

import { signUpFormValidation, hidePwd, showPwd } from './utils.js';

import { views } from '../view/index.js';
import { auth } from '../firebaseInit.js';

const eventSignUp = (event) => {
  event.preventDefault();
  const user = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  createUser(user)
    .then(() => {
      // console.log(res);
      registerUserBD(auth.currentUser.uid, { coverPhoto: '', aboutMe: '' });
      sendConfirmationEmail();
      window.location.hash = '#/email';
      event.target.reset();
    })
    .catch((err) => {
      signUpFormValidation(err.code);
    });
};


export default () => {
  const currentView = views.signUpView();

  const signUpForm = currentView.querySelector('#sign-up-form');
  signUpForm.addEventListener('submit', (event) => {
    eventSignUp(event);
  });

  const hidePassword = currentView.querySelector('#hide-password');
  hidePassword.addEventListener('click', hidePwd);

  const showPassword = currentView.querySelector('#show-password');
  showPassword.addEventListener('click', showPwd);

  return currentView;
};
