export default () => {
  const registryView = `
      <div class="welcome">
        <img src="../img/eco-trans-white.png" alt="chat" class="logo"/>
        <p class="app-name-text">eco-chat...</p>
      </div>
      <div class="holder">
        <h2 class="holder-title">Registrarse</h2>
        <form id="sign-up-form" name="register">
          <div class="form-control">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="text" name="name" id="name" class="form-field" placeholder="Nombre Completo">
            <i class="fas fa-exclamation-triangle"></i>
            <small>Mensaje de error</small>
          </div>
          <div class="form-control">
            <i class="fa fa-envelope icon"></i> 
            <input type="text" name="email" id="email" class="form-field" placeholder="Correo Electrónico">
            <i class="fas fa-exclamation-triangle"></i>
            <small>Mensaje de error</small>
          </div>
          <div class="form-control">
            <i class="fa fa-key" aria-hidden="true"></i>
            <input type="password" name="password" id="password" class="form-field" placeholder="Contraseña">
            <i class="fas fa-exclamation-triangle"></i>
            <small>Mensaje de error</small>
          </div>    
          <button id="sign-un-btn" class="form-btn">Registrar</button>
        </form>
        <p class="aid-text">¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></p>
      </div> 
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('screen-background');
  divElemt.innerHTML = registryView;
  return divElemt;
};
