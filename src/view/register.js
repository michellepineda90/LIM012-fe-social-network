export default () => {
  const registryView = `
  <h1 class="text-center">Aqui puedes Resgistrarte con facebook o google</h1>
  
  <form action="#" name="register">
    <input type="text" name="name" placeholder="Nombre Completo">
    <input type="text" name="email" placeholder="Correo Electrónico">
    <input type="password" name="password" placeholder="Contraseña">
    <button id="btn-register">Registrar</button>
    <span>¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></span>
  </form>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
