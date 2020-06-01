export default () => {
  const registryView = `
<<<<<<< Updated upstream
<<<<<<< HEAD
  <h1 class="text-center">-------------SING UP------------------</h1>
      <form id="sing-up-form">
        <input type="text" name="name" placeholder="Nombre Completo">
        <input type="text" name="email" placeholder="Correo Electrónico">
        <input type="password" name="password" placeholder="Contraseña">
        <button id="sing-up-btn">Registrar</button>
        <span>¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></span>
  </form>
=======
  <div class="form-background">
    <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
    <img src="../img/girl-logo.png" alt="welcome-phrase" class="girl-logo"/>
=======
  <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
  <img src="../img/girl-logo.png" alt="welcome-phrase" class="girl-logo"/>
  <div class="form-background">
>>>>>>> Stashed changes
    <div class="rectangle">
      <img src="../img/Imagen1.png" alt="recycling-symbol" class="logo"/>
      <h1 class="welcome-text">¡BIENVENID@ A</br> < ECOLOGY >!</h1>
      <div class="holder">
<<<<<<< Updated upstream
        <form action="#" name="register">
          <p class="holder-title">Registrarse</p>
          <input type="text" name="name" class="form-field user" placeholder="Nombre Completo">
          <input type="text" name="email" class="form-field email" placeholder="Correo Electrónico">
          <input type="password" name="password" class="form-field password" placeholder="Contraseña">
          <button id="btn-register" class="login-btn">Registrar</button>
          <p>¿Ya tienes una cuenta? <a href="#/login">Iniciar Sesión</a></p>
        </form>
      </div> 
    </div>
  </div>
>>>>>>> 3909d469a5aeac3d0f5e05cc351c8c053c426f7c
=======
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
>>>>>>> Stashed changes
  `;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
