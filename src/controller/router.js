
import { components } from '../view/index.js';
// import { control } from './main.controller.js';

// import signInController from './signInController.js';
// import signUpController from './signUpController.js';

// const control = {
//   signInUser: signInController,
//   signUpUser: signUpController,
// };


export const changeView = (hash, message) => {
  // const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/login':
    { return sectionMain.appendChild(components.login()); }
    // control.signInUser();
    case '#/register':
    { return sectionMain.appendChild(components.register()); }
    // control.signUpUser();
    case '#/profile':
    { return sectionMain.appendChild(components.profile()); }
    case '#/home':
    { return sectionMain.appendChild(components.home(message)); }
    default:
    { return sectionMain.appendChild(components.login()); }
  }
};
