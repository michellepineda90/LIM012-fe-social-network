
const post = `
<div class="post-header border">
  <img src="./img/login.png" class="post-user-photo">
  <div class="name-user-post">
    <spam class="name-user">Karen Gordillo</spam>
  <div class="row">          
    <small class="date-post"> 20/07/2020</small>          
    <div class="select-box">
    <div class="select-button btn cursor">
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
  </div>
</div>
<div class="settings-post">    
  <div class="select-box">
    <div class="select-button cursor btn">
      <div class="selected-value">
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>            
      </div>                
    </div>
    <div class="options">
      <div class="option">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Editar
      </div>
      <div class="option">
        <i class="far fa-trash-alt"></i>Delete
      </div>
    </div>
  </div>
</div>
</div>
<div class="post-body border">
  <p class='text-post-value'></p>
  <div class="img-post-value"></div>
</div>
<div class="post-likes border">
<span id="num-likes" class="quantity-icon">2
  <i class="fa fa-heart cursor" aria-hidden="true"></i>
</span>
<span id="num-comments" class="quantity-icon">4
  <i class="fa fa-comment-o cursor" aria-hidden="true"></i>
</span>
</div>
<div class="post-comments ">
<div class="create-comment-container border">
  <img src="./img/login.png" class="post-user-photo">
  <textarea type="text" class="input-comment" placeholder="Escribre un comentario"></textarea>
</div>
<div class="comment-created">
  <img src="./img/login.png" class="post-user-photo">
  <span class="comment-text"> 
    <span class="name-user"> Elena Gordilo</span>
    Hoy es un hermoso dia para salir entre amigos a pasear y compartir momentos      
  </span>
</div>
</div>`;


export const createPost = (text, images) => {
  const divPost = document.createElement('div');
  divPost.classList.add('post');
  divPost.innerHTML = post;
  const textContainer = divPost.querySelector('.text-post-value');
  textContainer.textContent = text;

  if (images.length > 0) {
    const imagesContainer = divPost.querySelector('.img-post-value');
    // postImages(images, imagesContainer);
    imagesContainer.innerHTML = images;
  }
  return divPost;
};
