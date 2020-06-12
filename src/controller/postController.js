/* eslint-disable no-console */
import {
  createPostBD, getAllPostsBD, deletePostBD, getPostBD, updatePostBD,
} from '../model/post.model.js';
import { post } from '../view/post.js';
import { uploadImage } from '../model/storage-post.js';
// import { uploadImage } from '../model/storage-post.js';


// crea un nuevo post
export const createPost = (user, text, images) => {
  const postObj = {
    textContent: text,
    imagesContent: images,
    likes: 0,
    comments: [
      { userName: 'Manuela', userPhoto: './img/login.png', text: 'Primera en comentar' },
      { userName: 'Juan', userPhoto: './img/login.png', text: 'Probando' },
      { userName: 'Pepito', userPhoto: './img/login.png', text: ':)' },
    ],
    privacity: 0,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    nameUser: user.displayName,
    idUser: user.uid,
    photoUser: user.photoURL,
  };
  Object.keys(images).forEach(file => uploadImage(images[file])
    .then((res) => {
      postObj.imagesContent = res;
      console.log('QUIERO VER ALGOOO', res);
      return postObj;
    }).then(obj => createPostBD(obj))
    .then(() => console.log('Post creado con exito!'))
    .catch(err => console.log('ERROR', err)));
  // .then(() => console.log('Post creado con exito!'))
  // .catch(err => console.log(err));
};

//  muestre el post creado en la interface
const renderPost = (doc, container) => {
  const divPost = document.createElement('div');
  divPost.classList.add('post');
  divPost.setAttribute('post-id', doc.id);
  divPost.innerHTML = post(doc.data(), doc.id);
  container.append(divPost);
};

// muestra todos los post registrados en la BD
export const renderAllPosts = container => getAllPostsBD()
  .onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach((change) => {
      console.log(change.type);
      if (change.type === 'added') {
        console.log('renderizando posts');
        renderPost(change.doc, container);
      } else if (change.type === 'removed') {
        console.log('eliminando algo');
        const divPost = container.querySelector(`[post-id=${change.doc.id}]`);
        console.log('este post se elimina:', divPost);
        container.removeChild(divPost);
      }
    });
  });


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
        renderAllPosts();
      })
      .catch(err => console.log(err));
  });
};

const editPost = (id) => {
  const modalEdit = bgModal.querySelector('.modal-edit');
  const saveChangesBtn = modalEdit.querySelector('button#save');
  const closeBtn = modalEdit.querySelector('#close');
  const editArea = modalEdit.querySelector('.edit-area');
  getPostBD(id)
    .then((doc) => {
      console.log(doc.data());
      bgModal.style.display = 'flex';
      modalEdit.classList.remove('hidden');
      editArea.value = doc.textContent;
    }).catch(err => console.log(err));

  closeBtn.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
    bgModal.style.display = 'none';
  });

  saveChangesBtn.addEventListener('click', () => {
    // const data = { textContent: }
    updatePostBD(id, { textContent: editArea.value })
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
      option.addEventListener('click', () => {
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
