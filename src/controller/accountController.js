import { views } from '../view/index.js';
import { uploadImage } from '../model/storage-post.js';
import { signOut, getCurrentUser } from '../model/user.model.js';
import {
  post, setStatePrivacity,
} from '../view/post.js';
import {
  createPostBD, deletePostBD, updatePostBD, getAllPostsBD,
} from '../model/post.model.js';

const createPost = (user, text, images, statePrivacity) => {
  const postObj = {
    textContent: text,
    imageContent: '',
    likes: 0,
    comments: [],
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


export default (page) => {
  // llama a la BD para mostrar todos los post registrados
  const user = getCurrentUser();

  const currentView = views.accountView(user, page);
  const menuBtn = currentView.querySelector('.menu-icon');

  const uploadImgBtn = currentView.querySelector('#upload-img-btn');
  const uploadImg = currentView.querySelector('#upload-img');
  const container = currentView.querySelector('.photo-container');
  const divPostsContainer = currentView.querySelector('.posts-container-home');

  const createPostBtn = currentView.querySelector('.post-btn');


  // btn para desplegar menu
  menuBtn.addEventListener('click', () => {
    const menu = currentView.querySelector('#menu');
    const state = menu.style.display;
    menu.style.display = (state === 'block') ? 'none' : 'block';
  });

  // boton para cargar imagenes para publicar
  uploadImgBtn.addEventListener('click', () => {
    uploadImg.click();
  });

  uploadImg.addEventListener('change', (event) => {
    const img = document.createElement('div');
    img.classList.add('div-img');
    const path = URL.createObjectURL(event.target.files[0]);
    img.innerHTML = `<i class='bx bx-x'></i><img class="img-post" src="${path}">`;
    container.append(img);
  });

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);
  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', () => {
    const photoContainer = currentView.querySelector('.photo-container');
    const images = uploadImg.files;
    const textPost = currentView.querySelector('.text-post');
    const privacity = currentView.querySelector('div.privacy');
    if (textPost.value || images.length > 0) {
      console.log('**creando nueva publicacion ***');
      createPost(user, textPost.value, images, privacity.id);
      textPost.value = '';
      privacity.innerHTML = setStatePrivacity('public');
      privacity.id = 'public';
      photoContainer.innerHTML = '';
      uploadImg.value = '';
    }
  });

  const bgModal = document.querySelector('.bg-modal');

  const editPostModal = (postId) => {
    const divRef = divPostsContainer.querySelector(`#${postId}`);
    const postMessage = divRef.querySelector('p');
    const privacy = divRef.querySelector('.privacy-icon');

    // Elementos definidos de la ventana modal
    const modal = modalEdit(postMessage.textContent, privacy.id);
    const saveBtn = modal.querySelector('button#save');
    const crossBtn = modal.querySelector('i#close');
    bgModal.appendChild(modal);

    console.log('***Editando Post***');
    saveBtn.addEventListener('click', () => {
      const divEditable = modal.querySelector('.edit-area');
      const privacyBtn = modal.querySelector('button.privacy');

      const data = {
        textContent: divEditable.textContent,
        privacity: privacyBtn.id,
      };
      updatePostBD(postId, data)
        .then(() => {
          postMessage.textContent = data.textContent;
          bgModal.style.display = 'none';
        });
    });

    crossBtn.addEventListener('click', () => {
      bgModal.removeChild(modal);
      bgModal.style.display = 'none';
    });
  };

  const deletePost = (id) => {
    const modal = modalDelete();
    bgModal.appendChild(modal);
    const deletePostBtn = modal.querySelector('button#delete');
    const cancelBtn = modal.querySelector('button#cancel');

    cancelBtn.addEventListener('click', () => {
      bgModal.removeChild(modal);
      bgModal.style.display = 'none';
    });

    deletePostBtn.addEventListener('click', () => {
      deletePostBD(id)
        .then(() => {
          // bgModal.removeChild(modal);
          bgModal.style.display = 'none';
        })
        .catch(err => console.log(err));
    });
  };

  getAllPostsBD(page).onSnapshot((querySnapshot) => {
    divPostsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().textContent}`);
      divPostsContainer.appendChild(post(doc.data(), doc.id));
    });
  });


  document.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('setting-post')) {
      const dropdown = element.parentNode;
      const menu = dropdown.querySelector('ul');
      menu.classList.toggle('show');
      console.log('clicked');
      const options = menu.querySelectorAll('li');
      options.forEach((option) => {
        option.addEventListener('click', () => {
          bgModal.style.display = 'flex';
          bgModal.innerHTML = '';
          if (option.id === 'delete') {
            deletePost(option.parentNode.id);
            // bgModal.style.display = 'none';
          } else if (option.id === 'edit') {
            editPostModal(option.parentNode.id);
          }
          menu.classList.remove('show');
        });
      });
    } else if (element.classList.contains('privacy')) {
      const dropdown = element.parentNode;
      const menu = dropdown.querySelector('ul');
      menu.classList.toggle('show');
      // console.log('clicked');
      const options = menu.querySelectorAll('li');
      options.forEach((option) => {
        option.addEventListener('click', () => {
          element.innerHTML = setStatePrivacity(option.id);
          element.id = option.id;
          menu.classList.remove('show');
        });
      });
    }

  });

  return currentView;
};
