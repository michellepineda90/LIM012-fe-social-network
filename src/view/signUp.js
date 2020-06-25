
export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('screen-background');
  divElemt.innerHTML = `
    <div class="logo-container">
    <img loading="lazy" src="https://firebasestorage.googleapis.com/v0/b/red-social-32aa8.appspot.com/o/eco-chat%2Feco-trans-white.png?alt=media&token=dbb3087a-d53a-49ca-8c76-fb8894a6d891" alt="" class="logo">
    <span class="app-name">eco-chat...</span>
  </div>
  <div class="form-container">
    <h1 class="form-title">Crea tu cuenta</h1>
    <form id="sign-up-form" name="register">
      <div class="form-control">
        <i class="fa fa-user icon-input" aria-hidden="true"></i>
        <input type="text" id="name" class="form-field" placeholder="Nombre Completo">
        <small>Mensaje de error</small>
      </div>
      <div class="form-control">
        <i class="fa fa-envelope icon-input"></i> 
        <input type="text" name="email" id="email" class="form-field" placeholder="Correo Electrónico" autocomplete="on">
        <small>Mensaje de error</small>
      </div>
      <div class="form-control">
        <i class="fa fa-key icon-input" aria-hidden="true"></i>
        <i id="show-password" class="fas fa-eye icon-psw hide cursor"></i>
        <i id="hide-password" class="fas fa-eye-slash icon-psw cursor"></i>
        <input type="password" name="password" id="password" placeholder="Contraseña" autocomplete="on">
        <small>Mensaje de error</small>
      </div>    
      <button id="form-btn" class="form-btn">CREAR CUENTA</button>
    </form>
    <span class="msg-err">error aqui</span>
    <span class="text-deco"> O bien ingresa con...</span>
    <div class="social-media-container">
    <button class ="icon-google">
    <i id="btn-google"class="fa fa-google" aria-hidden="true"></i>
    </button>
    <button class ="icon-facebook">
    <i id="btn-facebook"class="fa fa-facebook" aria-hidden="true"></i>          
    </button>
    </div>
    <span class="text-deco">¿No tienes una cuenta aún? <a href="#/login">Iniciar Sesión</a></span>`;

  return divElemt;
};
