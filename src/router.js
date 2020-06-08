
import { components } from './view/index.js';


export const changeView = (hash, message) => {
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/login':
    { return sectionMain.appendChild(components.login()); }
    case '#/register':
    { return sectionMain.appendChild(components.register()); }
    case '#/email':
    { return sectionMain.appendChild(components.sendemail()); }
    case '#/profile':
    { return sectionMain.appendChild(components.profile()); }
    case '#/home':
    { return sectionMain.appendChild(components.home(message)); }
    default:
    { return sectionMain.appendChild(components.login()); }
  }
};
