import { loginUser } from '../model/userModel.js';


// export const signInController = () => {
//   const singInForm = document.querySelector('#sing-in-form');
//   singInForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const user = {
//       email: singInForm.email.value,
//       psw: singInForm.password.value,
//     };
//     loginUser(user);
//     singInForm.reset();
//   });
// };
export default () => {
  const singInForm = document.querySelector('#sing-in-form');
  singInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
      email: singInForm.email.value,
      psw: singInForm.password.value,
    };
    loginUser(user);
    singInForm.reset();
  });
};
