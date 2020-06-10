
export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('screen-background');
  divElemt.innerHTML = `
  <div class="logo-container">
  <img src="/../../img/eco-trans-white.png" alt="" class="logo">
  <span class="app-name">eco-chat...</span>
</div>
<div class="form-container">
  <h1 class="form-title">Registrarse</h1>
  <form id="sign-up-form" name="register">
    <div class="form-control">
      <i class="fa fa-user icon-input" aria-hidden="true"></i>
      <input type="text" name="name" id="name" class="form-field" placeholder="Nombre Completo">
      <small>Mensaje de error</small>
    </div>
    <div class="form-control">
      <i class="fa fa-envelope icon-input"></i> 
      <input type="text" name="email" id="email" class="form-field" placeholder="Correo Electrónico">
      <small>Mensaje de error</small>
    </div>
    <div class="form-control">
      <i class="fa fa-key icon-input" aria-hidden="true"></i>
      <i id="show-password" class="fas fa-eye icon-psw hide cursor"></i>
      <i id="hide-password" class="fas fa-eye-slash icon-psw cursor"></i>
      <input type="password" name="password" id="password" placeholder="Contraseña">
      <small>Mensaje de error</small>
    </div>    
    <button id="sign-un-btn" class="form-btn">Registrar</button>
  </form>
  <span class="msg-err">error aqui</span>
  <span class="text-option"> O bien ingresa con...</span>
  <div class="social-media-container">
    <i id="btn-google"class="fa fa-google" aria-hidden="true"></i>
    <i id="btn-facebook"class="fa fa-facebook" aria-hidden="true"></i>          
  </div>
  <span>¿No tienes una cuenta aún? <a href="#/login">Iniciar Sesión</a></span>`;

  return divElemt;
};
