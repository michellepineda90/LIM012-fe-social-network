export default () => {
  const registryView = `
  <header>< ECOLOGY ></header>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
