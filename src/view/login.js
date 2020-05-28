export default () => {
  const registryView = `
  <h1 class="text-center">Iniciando sesion Aqui</h1>
  
  <form action="#" name="login" >
    <input type="text" name="email"  placeholder="Correo Electrónico">
    <input type="password" name="password" placeholder="Contraseña">
    <button id="btn-login">Iniciar Sesion</button>
    <span>¿No tienes una cuenta? <a href="#/register">Registrarse</a></span>
  </form>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};