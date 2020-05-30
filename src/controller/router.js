
import { components } from '../view/index.js';
import { control } from './index.controller.js';

export const changeTmp = (hash) => {
  // const id = hash.split('/')[1];
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
      sectionMain.appendChild(components.home());
      break;
    default:
      sectionMain.appendChild(components.login());
  }
};
