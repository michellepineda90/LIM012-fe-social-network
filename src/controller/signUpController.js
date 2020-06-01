import { createUser } from '../model/user.model.js';
import { setErrorFor, setSuccessFor } from './utils.js';
import { changeView } from './router.js';

const signUpFormValidation = () => {
  let valid = true;
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
    valid = false;
  } else if (name.length < 6) {
    setErrorFor(inputName, 'Nombre debe contener mínimo 6 caracteres!');
    valid = false;
  } else {
    setSuccessFor(inputName);
  }
  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Ingrese un correo Electrónico!');
    valid = false;
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Ingrese una contraseña!');
    valid = false;
  } else {
    setSuccessFor(inputPassword);
  }
  return valid;
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
    if (signUpFormValidation() === true) {
      console.log(user);
      createUser(user)
        .then(() => {
          console.log('te haz registrado');
        });
      singUpForm.reset();
    }
  });
};
