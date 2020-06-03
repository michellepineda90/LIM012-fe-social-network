import { createUser } from '../model/user.model.js';
import { setErrorFor, setSuccessFor } from './utils.js';


const signUpFormValidation = (code) => {
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password');
  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // console.log(email, password);
  // NAME
  if (name === '') {
    setErrorFor(inputName, 'Ingrese un Nombre!');
  } else if (name.length < 6) {
    setErrorFor(inputName, 'Nombre debe tener mínimo 6 caracteres!');
  } else {
    setSuccessFor(inputName);
  }
  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Ingrese un email');
  } else if (code === 'auth/invalid-email') {
    setErrorFor(inputEmail, 'El email ingresado es inválido');
  } else if (code === 'auth/email-already-in-use') {
    setErrorFor(inputEmail, 'El email esta vinculado a otra cuenta');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Ingrese una contraseña!');
  } else if (code === 'auth/weak-password') {
    setErrorFor(inputPassword, 'La contraseña debe tener mínimo 6 caracteres!');
  } else {
    setSuccessFor(inputPassword);
  }
};


export const eventSignUp = (event) => {
  event.preventDefault();
  const user = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  createUser(user)
    .then((data) => {
      window.location.hash = '#/home';
      console.log(data);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err.message, err.code);
      signUpFormValidation(err.code);
    });
};
