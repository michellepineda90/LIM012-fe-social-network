import { controllers } from './controller/mainController.js';
import sendEmailView from './view/sendEmail.js';


export const changeView = (hash) => {
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  let view = '';
  let page = '';
  switch (hash) {
    case '#/login':
      view = controllers.signInCtrl;
      break;
    case '#/register':
      view = controllers.signUpCtrl;
      break;
    case '#/email':
      view = sendEmailView();
      break;
    case '#/home':
      page = 'home';
      view = controllers.indexCtrl;
      break;
    case '#/profile':
      page = 'profile';
      view = controllers.indexCtrl;
      break;
    default:
      view = controllers.signInCtrl;
  }
  return sectionMain.append(view(page));
};
