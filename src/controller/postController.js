/* eslint-disable no-console */
import { auth } from '../firebaseInit.js';
import {
  createPostBD, deletePostBD, getPostBD, updatePostBD, likedPost, addComment,
} from '../model/post.model.js';
import { uploadImage } from '../model/storage-post.js';
// import { views } from '../view/index.js';

const commentText = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-btn');

// crea un nuevo post
export const createPost = (user, text, images, statePrivacity) => {
  const postObj = {
    textContent: text,
    imageContent: '',
    likes: [1, 2, 3, 4, 5],
    comments: [{
      userName: auth.currentUser.displayName,
      userPhoto: auth.currentUser.photoURL,
      text: commentText.value,
    }],
    privacity: statePrivacity,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    nameUser: user.displayName,
    idUser: user.uid,
    photoUser: user.photoURL,
  };
  if (images[0]) {
    uploadImage(images[0])
      .then((url) => {
        postObj.imageContent = url;
        createPostBD(postObj);
      });
  } else {
    createPostBD(postObj);
  }
};


const bgModal = document.querySelector('.bg-modal');


export const setStatePrivacity = type => `<i class='bx ${type === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'>
      </i> ${type === 'public' ? 'Público' : 'Privado'}<i class='bx bxs-down-arrow' ></i>`;


export const editPost = (id) => {
  const modalEdit = bgModal.querySelector('.modal-edit');
  const saveChangesBtn = modalEdit.querySelector('button#save');
  const closeBtn = modalEdit.querySelector('#close');
  const editArea = modalEdit.querySelector('.edit-area');
  const editPrivacy = modalEdit.querySelector('button.privacy');
  getPostBD(id)
    .then((doc) => {
      console.log('obteniedo post:', doc.data());
      bgModal.style.display = 'flex';
      modalEdit.classList.remove('hidden');
      editArea.textContent = doc.data().textContent;
      editPrivacy.innerHTML = setStatePrivacity(doc.data().privacity);
      editPrivacy.id = doc.data().privacity;
    }).catch(err => console.log(err));

  closeBtn.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
    bgModal.style.display = 'none';
  });

  saveChangesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const data = { textContent: editArea.textContent, privacity: editPrivacy.id };
    updatePostBD(id, data)
      .then(() => {
        console.log('Guardando cambios Post');
        modalEdit.classList.add('hidden');
        bgModal.style.display = 'none';
      });
  });
};


const dropdownDots = (idPost, idUser) => {
  // console.log(auth.currentUser.uid, idUser);
  const drop = `
  <div class="dropdown">
    <i class="bx bx-dots-horizontal-rounded dropdown-btn ${auth.currentUser.uid === idUser ? '' : 'hidden'}" post-id='${idPost}'></i>
    <ul class="right dropdown-menu" id="dots-1">
      <li id="edit"> <i class='bx bxs-edit' ></i>Editar</li>
      <li id="delete"><i class='bx bxs-trash'></i>Eliminar</li>
    </ul>
  </div> `;
  return drop;
};

// COMMENTS

// commentText.addEventListener('submit', () => {
//   if (e.keyCode === 13) {
//     addComment(postId, postObj); // the parameters for addComment
//   }
// });

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

export const post = (postObj, postId) => {
  const divPost = document.createElement('div');
  divPost.classList.add('post');
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
      ${(postObj.imageContent ? `<img src="${postObj.imageContent}"></img>` : '')}      
    </div>
    <div class="post-likes border">
    <div id="num-likes" class="quantity-icon">
    <i class='bx bx-heart' ></i>
      ${postObj.likes.length > 0 ? postObj.likes.length : ''} Me encanta
    </div>
    <div id="num-comments" class="quantity-icon">
    <i class='bx bx-comment-detail'></i>
    ${postObj.comments.length > 0 ? postObj.comments.length : ''} comentarios
    </div>
    </div>
    <div class="post-comments ">    
      <div class="create-comment-container border">
        <img src="${auth.currentUser.userPhoto}" class="post-user-photo">
          <textarea type="text" class="comment-input" placeholder="Escribe un comentario"></textarea>
          <button type="button" class="comment-btn">Publicar</button>
      </div>
      </div>`;

  // ${getAllComments(postObj.comments)}
  const dotsBtn = divPost.querySelector('.dropdown-btn');
  const dropdownMenu = divPost.querySelector('.dropdown-menu');
  dotsBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    // dropdownMenu.classList.add('active');
  });

  // const bgModal = document.querySelector('.bg-modal');
  const editOption = divPost.querySelector('li#edit');
  const deleteOption = divPost.querySelector('li#delete');

  deleteOption.addEventListener('click', () => {
    bgModal.style.display = 'flex';
    const modalDetele = bgModal.querySelector('.modal-delete');

    const deleteBtnModal = modalDetele.querySelector('button#delete');
    const cancelBtn = modalDetele.querySelector('button#cancel');
    modalDetele.classList.remove('hidden');

    cancelBtn.addEventListener('click', () => {
      modalDetele.classList.add('hidden');
      bgModal.style.display = 'none';
    });

    deleteBtnModal.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePostBD(postId)
        .then(() => {
          console.log('se elimino con exito');
          modalDetele.classList.add('hidden');
          bgModal.style.display = 'none';
        })
        .catch(err => console.log(err));
    });
  });

  editOption.addEventListener('click', () => {
    console.log('vamo a editar');
    const modalEdit = bgModal.querySelector('.modal-edit');
    const saveChangesBtn = modalEdit.querySelector('button#save');
    const closeBtn = modalEdit.querySelector('#close');
    const editArea = modalEdit.querySelector('.edit-area');
    const editPrivacy = modalEdit.querySelector('button.privacy');
    getPostBD(postId)
      .then((doc) => {
        console.log('obteniedo post:', doc.data());
        bgModal.style.display = 'flex';
        modalEdit.classList.remove('hidden');
        editArea.textContent = doc.data().textContent;
        editPrivacy.innerHTML = setStatePrivacity(doc.data().privacity);
        editPrivacy.id = doc.data().privacity;
      }).catch(err => console.log(err));

    closeBtn.addEventListener('click', () => {
      modalEdit.classList.add('hidden');
      bgModal.style.display = 'none';
    });

    saveChangesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const data = { textContent: editArea.textContent, privacity: editPrivacy.id };
      updatePostBD(postId, data)
        .then(() => {
          console.log('Guardando cambios Post');
          modalEdit.classList.add('hidden');
          bgModal.style.display = 'none';
        });
    });
  });

  const commentsBtn = divPost.querySelector('#num-comments');
  const comments = divPost.querySelector('.post-comments');
  commentsBtn.addEventListener('click', () => {
    comments.classList.toggle('show');
  });

  const likeBtn = divPost.querySelector('#num-likes');
  likeBtn.addEventListener('click', (e) => {
    e.target.innerHTML = `<i class='bx bxs-heart' ></i>
    ${postObj.likes > 0 ? postObj.likes : ''} Me encanta`;
    e.target.classList.toggle('liked');
    likedPost(postId);
  });

  return divPost;
};

const privacyModalBtn = document.querySelector('button.privacy');
const privacyModalMenu = document.querySelector('.dropdown-menu');
privacyModalBtn.addEventListener('click', () => {
  privacyModalMenu.classList.toggle('show');
  if (privacyModalMenu.classList.contains('show')) {
    const options = privacyModalMenu.querySelectorAll('li');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        privacyModalBtn.id = option.id;
        privacyModalBtn.innerHTML = `${option.innerHTML}<i class='bx bxs-down-arrow' ></i>`;
        privacyModalMenu.classList.remove('show');
      });
    });
  }
});
