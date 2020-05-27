export default () => {
  const registryView = `
  <p class="text-center">holiholiholi</p>
  <figure>
    <img src="https://i.stack.imgur.com/SCJZO.png" alt="registry-accounts">
  </figure>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
