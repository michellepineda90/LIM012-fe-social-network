export default () => {
  const registryView = `
  <h1 class="text-center">-------------SING IN------------------</h1>
  <form id="sing-in-form">  
    <input type="text" name="email" placeholder="Correo Electrónico">
    <input type="password" name="password" placeholder="Contraseña">
    <button id="sing-in-btn">Iniciar Sesion</button>  
  </form>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
