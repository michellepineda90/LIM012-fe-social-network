export default () => {
  const registryView = `
    <div class="welcome">
      <img src="../img/eco-trans-white.png" alt="recycling-symbol" class="logo"/>
      <p class="app-name-text">eco-chat...</p>
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
        <p class="aid-text">¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></p>
      </div> 
    </div>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('screen-background');
  divElemt.innerHTML = registryView;
  return divElemt;
};
