// import { changeTmp } from '../router.js';
import { signInUser } from '../model/user.model.js';
import { setErrorFor, setSuccessFor } from './utils.js';


const signInFormValidation = () => {
  let valid = true;
  const inputPassword = document.querySelector('#password');
  const inputEmail = document.querySelector('#email');
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Ingrese un correo Electrónico');
    valid = false;
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Ingrese una contraseña');
    valid = false;
  } else {
    setSuccessFor(inputPassword);
  }
  return valid;
};

export default () => {
  const singInForm = document.querySelector('#sign-in-form');
  const singInBtn = document.querySelector('#sign-in-btn');
  singInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
      email: singInForm.email.value,
      password: singInForm.password.value,
    };
    if (signInFormValidation() === true) {
      // loginUser(user);
      signInUser(user)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setErrorFor(singInBtn, 'El correo o la contraseña es incorrecto');
        });
      singInForm.reset();
      return true;
    } return false;
  });
};
