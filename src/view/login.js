import {
  eventSignIn,
  eventGoogle,
  eventFacebook,
  hidePwd,
  showPwd,
} from '../controller/signInController.js';

export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('screen-background');
  divElemt.innerHTML = `
  <div class="welcome">
        <img src="../img/eco-trans-white.png" alt="chat" class="logo"/>
        <p class="app-name-text">eco-chat...</p>
      </div>
      <div class="holder">
        <h2 class="holder-title">Iniciar Sesión</h2>
          <form id="sign-in-form" name="login">
            <div class="form-control">
              <i class="far fa-envelope"></i>
              <input type="text" name="email" id="email" class="form-field user" placeholder="Correo Electrónico">
              <i class="fas fa-exclamation-triangle error-icon"></i>
              <small>Mensaje de error</small>
            </div>
            <div class="form-control">
              <i id= "key" class="fas fa-key"></i>
              <input type="password" name="password" id="password" class="form-field password" placeholder="Contraseña">
              
              <span id="show-password" class="hide"><i class="fas fa-eye "></i></span>
              <span id="hide-password"><i class="fas fa-eye-slash "></i></span>

              <i class="fas fa-exclamation-triangle error-icon"></i>
              <small>Mensaje de error</small>
            </div>    
            <button id="sign-in-btn" class="form-btn">Iniciar Sesión</button>         
          </form>
          <p class="aid-text"> O bien ingresa con...</p>
          <div class="social-media">
            <i id="btn-google"class="fa fa-google" aria-hidden="true"></i>
            <i id="btn-facebook"class="fa fa-facebook" aria-hidden="true"></i>
          </div>
          <p class="aid-text">¿No tienes una cuenta? <a href="#/register"> Regístrate</a></p>
          </div>`;

  const singInForm = divElemt.querySelector('#sign-in-form');
  singInForm.addEventListener('submit', (event) => {
    eventSignIn(event);
  });

  const authGoogle = divElemt.querySelector('#btn-google');
  authGoogle.addEventListener('click', eventGoogle);

  const authFacebook = divElemt.querySelector('#btn-facebook');
  authFacebook.addEventListener('click', eventFacebook);

  const hidePassword = divElemt.querySelector('#hide-password');
  hidePassword.addEventListener('click', hidePwd);

  const showPassword = divElemt.querySelector('#show-password');
  showPassword.addEventListener('click', showPwd);
  return divElemt;
};
