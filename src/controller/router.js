import { components } from '../view/index.js';
import { control } from './main.controller.js';

// import signInController from './signInController.js';
// import signUpController from './signUpController.js';

// const control = {
//   signInUser: signInController,
//   signUpUser: signUpController,
// };


export const changeView = (hash, message) => {
  // const id = hash.split('/')[1];
  // console.log('hash es:', hash);
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/login':
      sectionMain.appendChild(components.login());
      control.signInUser();
      break;
    case '#/register':
      sectionMain.appendChild(components.register());
      control.signUpUser();
      break;
    case '#/profile':
      sectionMain.appendChild(components.profile());
      break;
    case '#/home':
      sectionMain.appendChild(components.home(message));
      break;
    default:
      sectionMain.appendChild(components.login());
  }
};
