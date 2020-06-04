import { auth } from '../firebaseInit.js';

export default () => {
  const registryView = `
  <p> Wellcome to Eco-chat..${auth.currentUser.email}</p>`;
  // console.log(auth.currentUser);
  const divElemt = document.createElement('div');
  divElemt.innerHTML = registryView;
  return divElemt;
};
