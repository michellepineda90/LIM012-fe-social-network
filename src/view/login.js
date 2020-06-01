export default () => {
  const registryView = `
  <div class="form-background">
    <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
    <img src="../img/girl-logo.png" alt="girl-recycling" class="girl-logo"/>
    <div class="rectangle">
      <img src="../img/Imagen1.png" alt="recycling-symbol" class="logo"/>
      <h1 class="welcome-text">¡BIENVENID@ A</br> < ECOLOGY >!</h1>
      <div class="holder">
        <p class="holder-title">Iniciar Sesión</p>
          <form id="sign-in-form" name="login">
            <div class="form-control">
              <i class="far fa-envelope"></i>
              <input type="text" name="email" id="email" class="form-field user" placeholder="Correo Electrónico">
              <small>Mensaje de error</small>
            </div>
            <div class="form-control">
              <i class="fas fa-key"></i>
              <input type="password" name="password" id="password" class="form-field password" placeholder="Contraseña">
              <small>Mensaje de error</small>
            </div>
            <div class="form-control">

              <button id="sign-in-btn" class="form-btn">Iniciar Sesión</button>
              <small>Mensaje de error</small>
            </div>
          </form>
          <p class="aid-text"> O bien ingresa con...</p>
          <div class="social-media">
            <img src="../img/facebook.png" alt="recycling-symbol" class=""/>
            <img src="../img/gmail.png" alt="recycling-symbol" class=""/>
          </div>
          <p class="aid-text">¿No tienes una cuenta? <a href="#/register"> Regístrate</a></p>
      </div>
    </div>
  </div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
