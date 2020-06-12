/* eslint-disable no-console */
import {
  createPostBD, deletePostBD, getPostBD, updatePostBD,
} from '../model/post.model.js';


// crea un nuevo post
export const createPost = (user, text, images, statePrivacity) => {
  const postObj = {
    textContent: text,
    imagesContent: images,
    likes: 0,
    comments: [
      { userName: 'Manuela', userPhoto: './img/login.png', text: 'Primera en comentar' },
      { userName: 'Juan', userPhoto: './img/login.png', text: 'Probando' },
      { userName: 'Pepito', userPhoto: './img/login.png', text: ':)' },
    ],
    privacity: statePrivacity,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    nameUser: user.displayName,
    idUser: user.uid,
    photoUser: user.photoURL,
  };
  createPostBD(postObj)
    .then(() => console.log('Post creado con exito!'))
    .catch(err => console.log(err));
};


let selected = '';
let dropdownMenu = '';

const bgModal = document.querySelector('.bg-modal');

const deletePost = (id) => {
  bgModal.style.display = 'flex';
  const modalDetele = bgModal.querySelector('.modal-delete');

  const deletePostBtn = modalDetele.querySelector('button#delete');
  const cancelBtn = modalDetele.querySelector('button#cancel');
  modalDetele.classList.remove('hidden');

  cancelBtn.addEventListener('click', () => {
    modalDetele.classList.add('hidden');
    bgModal.style.display = 'none';
  });

  deletePostBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deletePostBD(id)
      .then(() => {
        console.log('se elimino con exito');
        modalDetele.classList.add('hidden');
        bgModal.style.display = 'none';
      })
      .catch(err => console.log(err));
  });
};

// const updatePostView = (id) => {
//   console.log(doc.id);
//   const divPost = document.querySelector(`div#${doc.id}`);
//   divPost.querySelector('p').textContent = doc.data().textContent;
//   const priBtn = divPost.querySelector('i.privacy-icon');
//   priBtn.outerHTML = `<i class='bx ${doc.data().privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'></i>`;
// };

export const setStatePrivacity = type => `<i class='bx ${type === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'>
      </i> ${type === 'public' ? 'Público' : 'Privado'}<i class='bx bxs-down-arrow' ></i>`;

const editPost = (id) => {
  const modalEdit = bgModal.querySelector('.modal-edit');
  const saveChangesBtn = modalEdit.querySelector('button#save');
  const closeBtn = modalEdit.querySelector('#close');
  const editArea = modalEdit.querySelector('.edit-area');
  const privacyBtn = modalEdit.querySelector('button.privacy');
  getPostBD(id)
    .then((doc) => {
      console.log('obteniedo post:', doc.data());
      bgModal.style.display = 'flex';
      modalEdit.classList.remove('hidden');
      editArea.textContent = doc.data().textContent;
      privacyBtn.innerHTML = setStatePrivacity(doc.data().privacity);
      privacyBtn.id = doc.data().privacity;
    }).catch(err => console.log(err));

  closeBtn.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
    bgModal.style.display = 'none';
  });

  saveChangesBtn.addEventListener('click', () => {
    const data = { textContent: editArea.textContent, privacity: privacyBtn.id };
    updatePostBD(id, data)
      .then(() => {
        console.log('Guardando cambios Post');
        modalEdit.classList.add('hidden');
        bgModal.style.display = 'none';
      });
  });
};

const settingPost = (action, postId) => {
  if (action === 'edit') {
    editPost(postId);
    console.log('editando ----');
  } else if (action === 'delete') {
    deletePost(postId);
  }
};


document.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('setting-post') || element.classList.contains('privacy')) {
    if (dropdownMenu !== '') dropdownMenu.classList.add('hidden');
    const editPrivacy = !!element.classList.contains('privacy');
    const container = element.parentNode;
    selected = element;
    dropdownMenu = container.querySelector('ul');
    dropdownMenu.classList.remove('hidden');
    const options = dropdownMenu.querySelectorAll('li');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        selected.id = option.id;
        if (editPrivacy === true) {
          selected.innerHTML = `${option.innerHTML}<i class='bx bxs-down-arrow' ></i>`;
        } else {
          settingPost(selected.id, selected.getAttribute('post-id'));
        }
        dropdownMenu.classList.add('hidden');
      });
    });
  }
  if (event.target !== selected && dropdownMenu !== '') {
    dropdownMenu.classList.add('hidden');
  }
});
