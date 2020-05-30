export default () => {
  const registryView = `
  <h1 class="text-center">-------------SING UP------------------</h1>
      <form id="sing-up-form">
        <input type="text" name="name" placeholder="Nombre Completo">
        <input type="text" name="email" placeholder="Correo Electrónico">
        <input type="password" name="password" placeholder="Contraseña">
        <button id="sing-up-btn">Registrar</button>
        <span>¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></span>
  </form>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
