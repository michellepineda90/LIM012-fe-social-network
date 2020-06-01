export default () => {
  const registryView = `
  <div class="form-background">
    <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
    <img src="../img/girl-logo.png" alt="welcome-phrase" class="girl-logo"/>
    <div class="rectangle">
      <h1 class="welcome-text">Bienvenid@ a</h1>
      <img src="../img/eco-trans-white.png" alt="recycling-symbol" class="logo"/>
      <h1 class="app-name-text">eco-chat...</h1>
      <div class="holder">
        <p class="holder-title">Registrarse</p>
        <form id="sign-up-form" name="register">
          <div class="form-control">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="text" name="name" id="name" class="form-field" placeholder="Nombre Completo">
            <small>Mensaje de error</small>
          </div>
          <div class="form-control">
            <i class="fa fa-envelope icon"></i> 
            <input type="text" name="email" id="email" class="form-field" placeholder="Correo Electrónico">
            <small>Mensaje de error</small>
          </div>
          <div class="form-control">
            <i class="fa fa-key" aria-hidden="true"></i>
            <input type="password" name="password" id="password" class="form-field" placeholder="Contraseña">
            <small>Mensaje de error</small>
          </div>    
          <button id="sign-un-btn" class="form-btn">Registrar</button>
          <small> error mesage</small>
        </form>
        <p>¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></p>
      </div> 
    </div>
  </div>
  `;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
