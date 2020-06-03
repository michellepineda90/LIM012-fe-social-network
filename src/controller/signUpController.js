import { createUser } from '../model/user.model.js';
import { setErrorFor, setSuccessFor } from './utils.js';
// import { changeView } from './router.js';


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


export default () => {
  const singUpForm = document.querySelector('#sign-up-form');
  singUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
      name: singUpForm.name.value,
      email: singUpForm.email.value,
      password: singUpForm.password.value,
    };
    console.log(user);
    // if (signUpFormValidation() === true) {
    createUser(user)
      .then((data) => {
        window.location.replace('#/home');
        console.log(data);
        singUpForm.reset();
      })
      .catch((err) => {
        console.log(err.message, err.code);
        signUpFormValidation(err.code);
      });
    // }
  });
};
