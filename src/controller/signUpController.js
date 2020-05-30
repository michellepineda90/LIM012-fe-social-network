import { registerUser } from '../model/userModel.js';


export default () => {
  const singUpForm = document.querySelector('#sing-up-form');
  singUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
      name: singUpForm.name.value,
      email: singUpForm.email.value,
      psw: singUpForm.password.value,
    };
    registerUser(user);
    singUpForm.reset();
  });
};

// export const signUpController = () => {
//   const singUpForm = document.querySelector('#sing-up-form');
//   singUpForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const user = {
//       name: singUpForm.name.value,
//       email: singUpForm.email.value,
//       psw: singUpForm.password.value,
//     };
//     registerUser(user);
//     singUpForm.reset();
//   });
// };
