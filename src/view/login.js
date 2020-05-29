export default () => {
  const registryView = `
  <div class="form-background">
    <div class="rectangle">
      <img src="../img/Imagen1.png" alt="recycling-symbol" class="logo"/>
      <h1 class="welcome-text">¡BIENVENID@ A</br> < ECOLOGY >!</h1>
      <div class="holder">
        <form action="#" name="login">
          <p class="holder-title">Iniciar Sesión</p>
          <input type="text" name="email" class="form-field user" placeholder="Correo Electrónico">
          <input type="password" name="password" class="form-field password" placeholder="Contraseña">
          <button id="btn-login" class="login-btn">Iniciar Sesión</button>
          <p class="aid-text"> O bien ingresa con...</p>
          <div class="social-media">
            <img src="../img/facebook.png" alt="recycling-symbol" class=""/>
            <img src="../img/gmail.png" alt="recycling-symbol" class=""/>
          </div>
          <p class="aid-text">¿No tienes una cuenta? <a href="#/register"> Regístrate</a></p>
        </form>
      </div>
    </div>
  </div>`;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('login');
  divElemt.innerHTML = registryView;
  return divElemt;
};
