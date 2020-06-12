
export default (user) => {
  const mySelf = `
  <div class="my-self">
    <img src=${user.photoURL} class="user-photo">
    <span class="name-user">${user.displayName}</span>
  </div>`;

  const sectionCreatePost = `
  <section class="create-post-container">
        <span> Crear publicación</span>
        <div class="post-content">
          <div>
            <img src="./img/avatar.png" class="post-user-photo">
            <textarea class="text-post" contenteditable="true" name="textarea"  placeholder="¿Qué estas pensando?"></textarea>
            <!-- <div contenteditable class="edit-area"></div> -->
          </div>
          <div class="photo-container">                      
          </div>
        </div>
        <div class="btn-container">
          <div class="family-btn">
            <div class="btn opts" id="upload-img-btn">
              <input type="file" accept="image/*" id="upload-img" hidden="hidden" multiple>
              <i class='bx bxs-image'></i>
              Foto
            </div>
            <div class="dropdown">
            <div class="privacy btn opts" id="public">
              <i class='bx bx-world' ></i>Público 
              <i class='bx bxs-down-arrow' ></i>
            </div>        
            <ul class="dropdown-menu right hidden" id="dots-1">
              <li id="public"><i class='bx bx-world' ></i> Público</li>
              <li id="private"><i class='bx bxs-lock-alt' ></i>Privado</li>
            </ul>
          </div> 
          </div>
            <div class="btn post-btn">Publicar</div>
          </div>
      </section>`;

  const nav = `
  <nav>
    <div class="nav-bar">
      <i class='bx bx-menu menu-icon' ></i>
      <img class="logo" src="./img/eco-trans-white.png" >      
    </div>
    <ul id="menu">          
      <li class="option">
        <a href="#/Profile">
          <img src="./img/login.png" class="user-photo">
          <span>Elena Gordillo</span> 
        </a>
      </li>
      <li class="option"><a href="#/home"><i class='bx bxs-home' ></i>Inicio</a></li>
      <li class="option"><a href="#/login" id="btn-salir"><i class='bx bx-log-out'></i>Salir</a></li>
    </ul>
  </nav>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('screen');
  divElemt.innerHTML = `
  <header>
   ${nav}
  </header>
    <section class="content">
      <section class="profile-section">
      ${mySelf}
      </section>
      <section class="posts-section">
      ${sectionCreatePost}
      <div class="posts-container">
      </div>
    </section>
  `;

  return divElemt;
};
