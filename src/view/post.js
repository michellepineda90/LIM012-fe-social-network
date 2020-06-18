// import { auth } from '../firebaseInit.js';
// import { deletePost } from '../controller/postController.js';

export const modalDelete = () => {
  const divDelete = document.createElement('div');
  divDelete.classList.add('modal', 'modal-delete');
  divDelete.innerHTML = `
        <div class="modal modal-delete">
        <div class="modal-header">
          ¿Eliminar publicación?
        </div>
        <div class="modal-body">
          Estas segur@ de querer eliminar está publicación, al eliminar ya no podra ser recuperada.
        </div>
        <div class="modal-footer">
          <button id="cancel" class="ordinary-btn">Cancelar</button>
          <button id="delete" class="main-btn">Eliminar</button>
        </div>  
        </div>`;
  return divDelete;
};


export const setStatePrivacity = type => `<i class='bx ${type === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'>
      </i> ${type === 'public' ? 'Público' : 'Privado'}<i class='bx bxs-down-arrow' ></i>`;

export const modalEdit = (message, privacyState) => {
  console.log(`Este Post es => ${privacyState}`);
  const divEdit = document.createElement('div');
  divEdit.classList.add('modal', 'modal-edit');
  divEdit.innerHTML = `
      <div class="modal-header">
        Editar publicación
        <i class='bx bx-x pointer' id="close"></i>
      </div>
      <div class="modal-body">
        <img src="./img/avatar.png" class="post-user-photo">
        <div contenteditable class="edit-area"> 
        ${message} 
        </div>
        <div class="photo-container">
        </div>
      </div>
      <div class="modal-footer"> 
        <div class="dropdown">
          <button class="privacy ordinary-btn" id="${privacyState}">
            ${setStatePrivacity(privacyState)}
          </button>        
          <ul class="dropdown-menu right hidden" id="dots-1">
            <li id="public"><i class='bx bx-world' ></i> Público</li>
            <li id="private"><i class='bx bxs-lock-alt' ></i>Privado</li>
          </ul>
        </div> 
        <button id="save" class="main-btn">Guardar</button>
      </div>`;
  return divEdit;
};


const dropdownDots = (idPost, idUser) => {
  // console.log(auth.currentUser.uid, idUser);
  const drop = `
  <div class="dropdown ">
    <i class="bx bx-dots-horizontal-rounded setting-post ${auth.currentUser.uid === idUser ? '' : 'hidden'}"></i>
    <ul class="dropdown-menu right" id="${idPost}">
      <li id="edit"> <i class='bx bxs-edit' ></i>Editar</li>
      <li id="delete"><i class='bx bxs-trash'></i>Eliminar</li>
    </ul>
  </div> `;
  return drop;
};

// const getAllComments = (comments) => {
//   let allComments = '';
//   comments.forEach((com) => {
//     allComments += ` 
//       <div class="comment-created">
//         <img src="${com.userPhoto}" class="post-user-photo">
//         <span class="comment-text"> 
//           <span class="name-user"> ${com.userName}</span>
//           ${com.text}
//         </span>
//       </div>`;
//   });
//   return allComments;
// };

// export const post = (postObj, postId) => {
//   const divPost = document.createElement('div');
//   divPost.classList.add('post');
//   divPost.innerHTML = `
//   <div class="post-header border">
//       <img src="${postObj.photoUser}" class="icon-photo-user">       
//       <div class="name-date-post">
//         <div>
//           <span class="name-user">${postObj.nameUser}</span>
//           ${dropdownDots(postId, postObj.idUser)}
//         </div>
//         <small>${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}</small>
//         <i class='bx ${postObj.privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon' id="${postObj.privacity}"></i>
//       </div>   
//     </div>

export const post = (postObj, postId) => {
  const divPost = document.createElement('div');
  divPost.classList.add('post');
  divPost.id = postId;
  divPost.innerHTML = `
    <div class="post-header border">
      <img src="${postObj.photoUser}" class="icon-photo-user">       
      <div class="name-date-post">
        <div>
          <span class="name-user">${postObj.nameUser}</span>
          ${dropdownDots(postId, postObj.idUser)}
        </div>
        <small>${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}</small>
        <i class='bx ${postObj.privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon' id="${postObj.privacity}"></i>
      </div>   
    </div>

    <div class="post-body border"> 
      <p class="text-post-value"> ${postObj.textContent}</p>
      <button class="hidden">save</button>
      ${(postObj.imageContent ? `<img src="${postObj.imageContent}"></img>` : '')}      
    </div>
    <div class="post-likes border">
    <div id="num-likes" class="quantity-icon">
      <i class='bx bx-heart' ></i> Me encanta
    </div>
    <div id="num-comments" class="quantity-icon">
    <i class='bx bx-comment-detail'></i> comentarios
    </div>
    </div>
    <div class="post-comments ">    
      <div class="create-comment-container border">
        <img src="${auth.currentUser.photoURL}" class="post-user-photo">
        <textarea type="text" class="input-comment" placeholder="Escribre un comentario"></textarea>
        <i class="fas fa-paper-plane"></i>
      </div>
      </div>`;


  const commentsBtn = divPost.querySelector('#num-comments');
  const comments = divPost.querySelector('.post-comments');
  commentsBtn.addEventListener('click', () => {
    comments.classList.toggle('show');
  });

//   const bgModal = document.querySelector('.bg-modal');
//   const editOption = divPost.querySelector('li#edit');
//   const deleteOption = divPost.querySelector('li#delete');

//   deletePost.addEventListener('click', () => {
//     bgModal.style.display = 'flex';
//     const modalDetele = bgModal.querySelector('.modal-delete');

//     const deletePostBtn = modalDetele.querySelector('button#delete');
//     const cancelBtn = modalDetele.querySelector('button#cancel');
//     modalDetele.classList.remove('hidden');

//     cancelBtn.addEventListener('click', () => {
//       modalDetele.classList.add('hidden');
//       bgModal.style.display = 'none';
//     });

//     deletePostBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       deletePostBD(id)
//         .then(() => {
//           console.log('se elimino con exito');
//           modalDetele.classList.add('hidden');
//           bgModal.style.display = 'none';
//         })
//         .catch(err => console.log(err));
//     });
//   });


//   return divPost;
// };
