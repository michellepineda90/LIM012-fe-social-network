
export default (user) => {
  const mySelf = `
  <div class="my-self">
    <img src=${user.photo} class="user-photo">
    <span class="name-user">${user.name}</span>
  </div>`;

  const sectionCreatePost = `
  <section class="create-post-container">
    <div class="post-content">
      <textarea class="text-post" name="textarea"  placeholder="¿Qué estas pensando?"></textarea>
      <div class="photo-container">
      </div>
    </div>
    <div class="btn-container">
      <div class="btn" id="upload-img-btn">
        <input type="file" accept="image/*" id="upload-img" hidden="hidden" multiple>
        <i class="fa fa-picture-o" aria-hidden="true"></i>Foto
      </div>
      <div class="select-box">
        <div class="select-button cursor btn">
          <div class="selected-value">
            <i class="fa fa-globe" aria-hidden="true"></i>
          </div>
          <div class="chevrons">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        <div class="options">
          <div class="option"><i class="fa fa-globe" aria-hidden="true"></i> Público</div>
          <div class="option"><i class="fa fa-lock" aria-hidden="true"></i> Privado</div>
        </div>
      </div>
      <div class="btn post-btn cursor">Publicar</div>
    </div> 
  </section>`;

  const nav = `
  <nav>
    <div class="nav-bar">
      <i class="fa fa-bars menu-icon" aria-hidden="true"></i>
      <img class="logo" src="./img/eco-trans-white.png" >      
    </div>
    <ul id="menu">          
      <li class="option"><a href="#/home"><i class="fas fa-home"></i>Inicio</a></li>
      <li class="option">
        <a href="#/Profile">
          <img src=${user.photo} class="user-photo">
          <span>${user.name}</span> 
        </a>
      </li>
      <li class="option"><a href="#/login"><i class="fas fa-sign-out-alt"></i>Salir</a></li>
    </ul>
  </nav>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('screen');
  divElemt.innerHTML = `
  <header>
   ${nav}
  </header>
    <section class="content">
      ${mySelf}
      ${sectionCreatePost}
      <section class="posts-container">
      </section>
    </section>
  `;

  return divElemt;
};
