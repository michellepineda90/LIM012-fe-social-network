import { createUser, registerUser, sendEmail } from '../model/user.model.js';
import { setErrorFor, setSuccessFor, sendMessage } from './utils.js';


const signUpFormValidation = (code) => {
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password');
  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // NAME
  if (name === '') {
    setErrorFor(inputName, 'Por favor, ingrese nombre');
  } else if (name.length < 6) {
    setErrorFor(inputName, 'Nombre debe contener mínimo 6 caracteres!');
  } else {
    setSuccessFor(inputName);
  }
  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Por favor, ingrese correo');
  } else if (code === 'auth/invalid-email') {
    setErrorFor(inputEmail, 'El correo ingresado es inválido');
  } else if (code === 'auth/email-already-in-use') {
    sendMessage('El correo ya esta vinculado a otra cuenta');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Por favor, ingrese contraseña');
  } else if (code === 'auth/weak-password') {
    setErrorFor(inputPassword, 'La contraseña debe contener mínimo 6 caracteres');
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
    .then((res) => {
      sendEmail();
      const userObj = { name: user.name, email: user.email };
      return registerUser(res.user.uid, userObj);
    })
    .then(() => {
      window.location.hash = '#/email';
      event.target.reset();
    })
    .catch((err) => {
      signUpFormValidation(err.code);
    });
};
