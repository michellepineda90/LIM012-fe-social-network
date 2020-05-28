export default () => {
  const registryView = `
  <div class="form-background">
    <div class="rectangle">
      <img src="../img/Imagen1.png" alt="recycling-symbol" class="logo"/>
      <h1 class="welcome-text">¡BIENVENID@ A</br> < ECOLOGY >!</h1>
      <div class="holder">
        <form action="#" name="login">
          <p class="holder-title">Iniciar Sesión</p>
          <input type="text" name="email" class="form-field" placeholder="Correo Electrónico">
          <input type="password" name="password" class="form-field" placeholder="Contraseña">
          <button id="btn-login" class="login-btn">Iniciar Sesión</button>
          <p>O bien ingresa con...</p>
          <span>¿No tienes una cuenta? <a href="#/register">Registrarse</a></span>
        </form>
      </div>
    </div>
  </div>`;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('login');
  divElemt.innerHTML = registryView;
  return divElemt;
};
