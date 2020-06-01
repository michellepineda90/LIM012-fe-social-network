export default (message) => {
  const registryView = `
  <p>${message}</p>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
