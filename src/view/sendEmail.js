
import { auth } from '../firebaseInit.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.classList.add('screen-background');
  divElement.innerHTML = `
  <div class=" logo-container">
    <img src="/../../img/eco-trans-white.png" alt="" class="logo">
    <span class="app-name">eco-chat...</span>
  </div>
  <div class="form-container">
    <div class="message-container">
      <h2 class="message-title">¡Gracias por registrarte!</h2>    
      <span class="text-deco"> Hemos enviado un correo de confirmación a <strong>${auth.currentUser.email}</strong></span>
      <span class="text-deco">Por favor revisa tu correo y haz click en el enlace para verificar la dirección del correo.</span>
      <button class="btn-send-email">Reenviar correo de verificación</button>
      <span><a href="#/login"> Inicia Sesión</a></span>
    </div>
  </div>
  `;

  return divElement;
};
