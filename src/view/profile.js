export default () => {
  const registryView = `
  <h1 class="text-center">Mi perfil</h1>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
