import { auth } from '../firebaseInit.js';
import {
  deletePostBD, updatePostBD, getAllCommentsBD,
} from '../model/post.model.js';
import { createCommentObj } from '../controller/postController.js';


// funcion que permite visualizar la opcion q elegimos en el dropdown de privacidad,
// este funcionn se usa en el dropdown para crear un post como tbm en la ventana modal al editar
// un post.
export const setStatePrivacity = type => `<i class="bx ${type === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon">
      </i> ${type === 'public' ? 'Público' : 'Privado'} <i class="bx bxs-down-arrow"></i>`;

// Template de la ventana modal del mensaje  de confirmacion para eliminar un post
const modalDelete = (type) => {
  const divDelete = document.createElement('div');
  divDelete.classList.add('modal', 'modal-delete');
  divDelete.innerHTML = `
  <div class="modal-header">
  ¿Eliminar ${type === 'post' ? 'publicación' : 'comentario'}?
  </div>
  <div class="modal-body">
    ${type === 'post' ? 'Estas segur@ de querer eliminar está publicación, al eliminar ya no podra ser recuperada.'
    : '¿Segur@ que quieres eliminar este comentario?'}
  </div>
  <div class="modal-footer">
    <button id="cancel" class="ordinary-btn">Cancelar</button>
    <button id="delete" class="main-btn">Eliminar</button>
  </div>`;
  return divDelete;
};

// template de la ventana modal para editar un post existente
// los datos que se le pasan son los del post que se quieren editar
const modalEdit = (message, privacyState) => {
  // console.log(`Este Post es => ${privacyState}`);
  const divEdit = document.createElement('div');
  divEdit.classList.add('modal', 'modal-edit');
  divEdit.innerHTML = `
      <div class="modal-header">
        Editar publicación
        <i class='bx bx-x pointer' id="close"></i>
      </div>
      <div class="modal-body">
        <img src="${auth.currentUser.photoURL}" class="post-user-photo">
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
          <ul class="dropdown-menu right hidden">
            <li id="public"><i class='bx bx-world' ></i> Público</li>
            <li id="private"><i class='bx bxs-lock-alt' ></i>Privado</li>
          </ul>
        </div> 
        <button id="save" class="main-btn">Guardar</button>
      </div>`;

  // evento para mostrar/ocultar el dropdown en esta ventan modal
  const privacyBtn = divEdit.querySelector('.ordinary-btn');
  const menu = divEdit.querySelector('ul');
  const options = menu.querySelectorAll('li');

  privacyBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        privacyBtn.innerHTML = setStatePrivacity(option.id);
        privacyBtn.id = option.id;
        menu.classList.toggle('show');
      });
    });
  });
  return divEdit;
};

//  template del dropdown para eliminar/editar un post que aparece en la esquina de cada post
const dropdownDots = (idUser) => {
  const drop = `
  <div class="dropdown">
    <i class="bx bx-dots-horizontal-rounded setting-post ${auth.currentUser.uid === idUser ? '' : 'hidden'}"></i>
    <ul class="dropdown-menu right">
      <li id="edit"> <i class='bx bxs-edit' ></i>Editar</li>
      <li id="delete"><i class='bx bxs-trash'></i>Eliminar</li>
    </ul>
  </div> `;
  return drop;
};

// bgModal es el div oscuro que aparece detras de las ventanas modales cuando se visualizan
const bgModal = document.querySelector('.bg-modal');

// funcionalidad para la ventana modal
const editPostModal = (postId, message, privacy) => {
  const modal = modalEdit(message, privacy);
  const saveBtn = modal.querySelector('button#save');
  const crossBtn = modal.querySelector('i#close');
  bgModal.appendChild(modal);

  // console.log('***Editando Post***');
  // Btn para guardar los cambios de un post  en la BD
  saveBtn.addEventListener('click', () => {
    const divEditable = modal.querySelector('.edit-area');
    const privacyBtn = modal.querySelector('button.privacy');
    const data = {
      textContent: divEditable.textContent,
      privacity: privacyBtn.id,
    };
    // funcion que se conecta con firebase para actualizar un post
    updatePostBD(postId, data)
      .then(() => {
        bgModal.removeChild(modal);
        bgModal.style.display = 'none';
      });
  });
  // evento para cerrar la ventana modal de editar
  crossBtn.addEventListener('click', () => {
    bgModal.removeChild(modal);
    bgModal.style.display = 'none';
  });
};

const deletePost = (id) => {
  const modal = modalDelete('post');
  bgModal.appendChild(modal);
  const deletePostBtn = modal.querySelector('button#delete');
  const cancelBtn = modal.querySelector('button#cancel');

  // cancela la accion de eliminar y cierra la ventan modal de eliminar
  cancelBtn.addEventListener('click', () => {
    bgModal.removeChild(modal);
    bgModal.style.display = 'none';
  });

  // confirma la accion de eliminar y llama a la funcion que se conecta con firebase
  // para remover el post de la BD
  deletePostBtn.addEventListener('click', () => {
    deletePostBD(id)
      .then(() => {
        bgModal.style.display = 'none';
      });
    // .catch(err => console.log(err));
  });
};

const editComment = (id, textEditable) => {
  const name = textEditable.querySelector('strong');
  name.style.display = 'none';
  textEditable.setAttribute('contenteditable', true);
  textEditable.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // aqui debes de llama a tu funcion que guardara los cambios en la bd
      // si todo sale bien deberia ejecutarse lo sgt
      textEditable.setAttribute('contenteditable', false);
      name.style.display = 'inline';
    }
  });
};

const deleteComment = (id) => {
  const modal = modalDelete('comment');
  bgModal.appendChild(modal);
  const deletePostBtn = modal.querySelector('button#delete');
  const cancelBtn = modal.querySelector('button#cancel');

  // cancela la accion de eliminar y cierra la ventan modal de eliminar
  cancelBtn.addEventListener('click', () => {
    bgModal.removeChild(modal);
    bgModal.style.display = 'none';
  });

  // confirma la accion de eliminar y llama a la funcion que se conecta con firebase
  // para remover el post de la BD
  deletePostBtn.addEventListener('click', () => {
    // aqui deberias llamar a tu funcion para eliminar el comentario en la bd
    // deleteCommentBD(id)
    //   .then(() => {
    //     bgModal.style.display = 'none';
    //   });
    // .catch(err => console.log(err));
  });
};

const renderComments = (commentObj, commentId) => {
  const divComment = document.createElement('div');
  divComment.classList.add('comment-created');
  // añadirle el id del comment generado por firebase
  divComment.id = commentId;
  divComment.innerHTML = `
  <img src="${commentObj.photoUser}" class="post-user-photo">
    <span class="comment-text">
      <strong> ${commentObj.nameUser}</strong>
      ${commentObj.textContent}
    </span>
    ${dropdownDots(commentObj.userId)}
    `;

  const dropdown = divComment.querySelector('.setting-post');
  const menu = divComment.querySelector('ul');
  dropdown.addEventListener('click', () => {
    const textMessage = divComment.querySelector('.comment-text');
    // permite mostra la opcion de eliminar y editar
    menu.classList.toggle('show');
    // detecta una de opciones editar o eliminar y deacuerdo a eso
    // llama a la ventana modal que le correspoda
    const options = menu.querySelectorAll('li');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (option.id === 'delete') {
          bgModal.style.display = 'flex';
          bgModal.innerHTML = '';
          deleteComment(commentId);
        } else if (option.id === 'edit') {
          editComment(commentId, textMessage);
        }
        menu.classList.remove('show');
      });
    });
  });

  return divComment;
};

// Template de cada post que se crea, es llamado por el snapshot,
// aqui mismo tiene definido eventos que podra realizar ciertos elementos como botones,
// dropdown, etc
export const post = (postObj, postId) => {
  // const liked = postObj.likes.includes(auth.currentUser.uid);

  const divPost = document.createElement('div');
  divPost.classList.add('post');
  divPost.id = postId;
  divPost.innerHTML = `
    <div class="post-header border">
      <img src="${postObj.photoUser}" class="icon-photo-user">       
      <div class="name-date-post">
        <div>
          <span class="name-user">${postObj.nameUser}</span>
          ${dropdownDots(postObj.idUser)}
        </div>
        <small>${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}</small>
        <i class='bx ${postObj.privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon' id="${postObj.privacity}"></i>
      </div>   
    </div>
    <div class="post-body border"> 
      <p class="text-post-value"> ${postObj.textContent}</p>
      ${(postObj.imageContent ? `<img src="${postObj.imageContent}"></img>` : '')}      
    </div>
    <div class="post-likes border">
    <div id="num-likes" class="quantity-icon"> <i class="bx bxs-heart"></i>
      Me encanta
    </div>
    <div id="num-comments" class="quantity-icon">
    <i class='bx bx-comment-detail'></i> comentarios
    </div>
    </div>
    <div class="post-comments ">    
      <div class="create-comment-container border">
        <img src="${auth.currentUser.photoURL}" class="post-user-photo">
        <textarea type="text" class="input-comment" placeholder="Escribe un comentario"></textarea>
        <i class="fas fa-paper-plane"></i>
      </div>
      <div class="comments-container"></div>
      </div>`;

  const sendCommentBtn = divPost.querySelector('.fa-paper-plane');
  const commentsContainer = divPost.querySelector('.comments-container');

  sendCommentBtn.addEventListener('click', () => {
    const commentInput = divPost.querySelector('.input-comment');
    if (commentInput && commentInput.value) {
      createCommentObj(commentInput.value, auth.currentUser, postId);
      commentInput.innerText = '';
    } else {
      commentInput.setCustomValidity('Debes ingresar un comentario');
      commentInput.reportValidity();
    }
  });

  // getAllCommentsBD(postId)
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((comment) => {
  //       commentsContainer.appendChild(renderComments(comment.data()));
  //     });
  //   });

  getAllCommentsBD(postId).onSnapshot((querySnapshot) => {
    commentsContainer.innerHTML = '';
    querySnapshot.forEach((comment) => {
      console.log(comment.data());
      commentsContainer.appendChild(renderComments(comment.data(), comment.id));
    });
  });

  // evento que muetra/oculta los comentarios
  const commentsBtn = divPost.querySelector('#num-comments');
  const comments = divPost.querySelector('.post-comments');
  commentsBtn.addEventListener('click', () => {
    comments.classList.toggle('show');
  });

  // evento para dar like a un post
  // const likeBtn = divPost.querySelector('#num-likes');
  // likeBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const index = postObj.likes.indexOf(auth.currentUser.uid);
  //   if (index > -1) {
  // console.log('liked---');
  //     postObj.likes.splice(index, 1);
  //     createlikeBD(postId, postObj.likes);
  //     e.target.classList.add('liked');
  //   } else {
  //     // console.log('disliked---');
  //     postObj.likes.push(String(auth.currentUser.uid));
  //     e.target.classList.remove('liked');
  //     createlikeBD(postId, postObj.likes);
  //   }
  // });

  // evento para desplegar el dropdrown de editar/eliminar post
  const dropdown = divPost.querySelector('.setting-post');
  const menu = divPost.querySelector('ul');
  dropdown.addEventListener('click', () => {
    const textMessage = divPost.querySelector('p');
    const privacity = divPost.querySelector('.privacy-icon');
    // permite mostra la opcion de eliminar y editar
    menu.classList.toggle('show');
    // detecta una de opciones editar o eliminar y deacuerdo a eso
    // llama a la ventana modal que le correspoda
    const options = menu.querySelectorAll('li');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        bgModal.style.display = 'flex';
        bgModal.innerHTML = '';
        if (option.id === 'delete') {
          deletePost(postId);
        } else if (option.id === 'edit') {
          editPostModal(postId, textMessage.textContent, privacity.id);
        }
        menu.classList.remove('show');
      });
    });
  });


  return divPost;
};
