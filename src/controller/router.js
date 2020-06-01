import { components } from '../view/index.js';

export const changeTmp = (hash) => {
  // const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(components.login()); }
    case '#/register':
    { return sectionMain.appendChild(components.register()); }
    case '#/profile':
    // Arreglar
    { return sectionMain.appendChild(components.profile()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};
