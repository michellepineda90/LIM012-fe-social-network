import { auth } from '../firebaseInit.js';
import { sendEmail } from '../model/user.model.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.classList.add('screen-background');
  divElement.innerHTML = `
  <div class="welcome">
  <img src="../img/eco-trans-white.png" alt="chat" class="logo"/>
  <p class="app-name-text">eco-chat...</p>
  </div>
  <div class="holder">
  <h2 class="holder-title">¡Gracias por registrarte!</h2>    
  <p class=""> Hemos enviado un correo de confirmación a <strong>${auth.currentUser.email}</strong></p>
  <p>Por favor revisa tu correo y haz click en el enlace para verificar la dirección del correo.</p>
  <button class="form-btn">Reenviar correo de verificación</button>
  <p><a href="#/login"> Inicia Sesión</a></p>
  </div>
  `;


  const btn = divElement.querySelector('button');
  btn.addEventListener('click', () => {
    console.log('volciendo a enviar email');
    sendEmail();
  });

  return divElement;
};
