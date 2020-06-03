import { eventGoogle, eventFacebook } from '../controller/signInController.js';

export default () => {
  const registryView = `
  <div class="form-background">
    <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
    <img src="../img/girl-logo.png" alt="girl-recycling" class="girl-logo"/>
    <div class="rectangle">
      <h1 class="welcome-text">Bienvenid@ a</h1>
      <img src="../img/eco-trans-white.png" alt="recycling-symbol" class="logo"/>
      <h1 class="app-name-text">eco-chat...</h1>
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
            <button id="sign-in-btn" class="form-btn">Iniciar Sesión</button>
          </form>
          <p class="aid-text"> O bien ingresa con...</p>
          <div class="social-media">
            <i id= "btn-google" class="fa fa-google" aria-hidden="true"></i>
            <i id= "btn-facebook" class="fa fa-facebook" aria-hidden="true"></i>
          </div>
          <p class="aid-text">¿No tienes una cuenta? <a href="#/register"> Regístrate</a></p>
      </div>
    </div>
  </div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = registryView;

  const authGoogle = divElemt.querySelector('#btn-google');
  authGoogle.addEventListener('click', eventGoogle);
  const authFacebook = divElemt.querySelector('#btn-facebook');
  authFacebook.addEventListener('click', eventFacebook);
  return divElemt;
};
