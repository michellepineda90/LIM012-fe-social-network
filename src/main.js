import { changeView } from './router.js';

const init = () => {
  changeView(`${window.location.hash}`);
  window.addEventListener('hashchange', () => changeView(`${window.location.hash}`));
};

window.addEventListener('load', init);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = user.emailVerified ? '/home' : '/email';
  } else {
    window.location.hash = '/login';
    if (window.unsubscribe) window.unsubscribe();
  }
});
