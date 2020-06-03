// import { changeTmp } from '../router.js';
import { signInUser } from '../model/user.model.js';
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

export const signIn = (event) => {
  event.preventDefault();
  const user = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  signInUser(user)
    .then((data) => {
      window.location.replace('#/home');
      console.log(data);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err.code, err.message);
      signInFormValidation(err.code);
    });
};
