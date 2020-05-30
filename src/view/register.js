export default () => {
  const registryView = `
  <img src="../img/welcome-logo.png" alt="welcome-phrase" class="welcome-logo"/>
  <img src="../img/girl-logo.png" alt="welcome-phrase" class="girl-logo"/>
  <div class="form-background">
    <div class="rectangle">
      <img src="../img/Imagen1.png" alt="recycling-symbol" class="logo"/>
      <h1 class="welcome-text">¡BIENVENID@ A</br> < ECOLOGY >!</h1>
      <div class="holder">
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
  `;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('position');
  divElemt.innerHTML = registryView;
  return divElemt;
};
