
const flexBoxPrivacy = `
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
  </div>`;

const flexBoxSettingPost = `
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
  </div>`;

const getAllComments = (comments) => {
  let allComments = '';
  comments.forEach((com) => {
    allComments += ` 
      <div class="comment-created">
        <img src="${com.userPhoto}" class="post-user-photo">
        <span class="comment-text"> 
          <span class="name-user"> ${com.userName}</span>
          ${com.text}
        </span>
      </div>`;
  });
  return allComments;
};


export const post = (postObj) => {
  const divPost = `
    <div class="post-header border">
      <img src="${postObj.photoUser}" class="post-user-photo">
      <div class="name-user-post">
        <spam class="name-user">${postObj.nameUser}</spam>
        <div class="row">          
          <small class="date-post">
          ${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}
          </small>          
          ${flexBoxPrivacy}
        </div>
        ${flexBoxSettingPost}
      </div>    
    </div>

    <div class="post-body border"> 
      <p class="text-post-value"> ${postObj.textContent}</p>
      ${(postObj.imagesContent[0] ? `<img src="${postObj.imagesContent[0]}"></img>` : '')}      
    </div>
    <div class="post-likes border">
    <span id="num-likes" class="quantity-icon">${postObj.likes}
      <i class="fa fa-heart cursor" aria-hidden="true"></i>
    </span>
    <span id="num-comments" class="quantity-icon">${postObj.comments.length}
      <i class="fa fa-comment-o cursor" aria-hidden="true"></i>
    </span>
    </div>
    <div class="post-comments ">    
      <div class="create-comment-container border">
        <img src="${postObj.photoUser}" class="post-user-photo">
        <textarea type="text" class="input-comment" placeholder="Escribre un comentario"></textarea>
      </div>
      ${getAllComments(postObj.comments)}
    </div>`;

  return divPost;
};
