// import { auth } from 'firebase-admin';
import { views } from '../view/index.js';
import {
  signOut, getCurrentUser, updateImgCoverUser, getInfoUserBD,
} from '../model/user.model.js';
import { post, setStatePrivacity } from '../view/post.js';
import { getAllPostsBD } from '../model/post.model.js';
import { createPost } from './postController.js';
import { emojiEvent, coverDefault } from './utils.js';
import { uploadImage } from '../model/storage-post.js';

export default (page) => {
  // llama a la BD para mostrar todos los post registrados
  const user = getCurrentUser();

  if (!user) {
    window.location.hash = '#/login';
    return views.signInView();
  }

  const currentView = views.accountView(user, page);
  const menuBtn = currentView.querySelector('.menu-icon');

  const uploadImgBtn = currentView.querySelector('#upload-img-btn');
  const uploadImg = currentView.querySelector('#upload-img');
  const imageContainer = currentView.querySelector('.photo-container');
  const divPostsContainer = currentView.querySelector('.posts-container');

  const createPostBtn = currentView.querySelector('.post-btn');

  // btn para desplegar menu
  menuBtn.addEventListener('click', () => {
    const menu = currentView.querySelector('#menu');
    const state = menu.style.display;
    menu.style.display = (state === 'block') ? 'none' : 'block';
  });

  getInfoUserBD(user.uid)
    .then((doc) => {
      const coverPhoto = currentView.querySelector('.user-photo-cover');
      coverPhoto.src = (doc.data().coverPhoto !== '') ? doc.data().coverPhoto : coverDefault;
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
    imageContainer.append(img);
    if (event.target.files[0]) {
      createPostBtn.disabled = false;
      createPostBtn.classList.add('enabled');
    } else {
      createPostBtn.disabled = true;
      createPostBtn.classList.remove('enabled');
    }

    const cross = imageContainer.querySelectorAll('.bx-x');
    cross.forEach((x) => {
      x.addEventListener('click', (e) => {
        const image = e.target.parentNode;
        imageContainer.removeChild(image);
      });
    });
  });


  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);

  // evento que escucha al input para ver si hay algo que
  // publicar de ser asi, activa el boton de publicar
  const textArea = currentView.querySelector('#text-area-post');
  textArea.addEventListener('input', (e) => {
    if (e.target.textContent) {
      createPostBtn.classList.add('enabled');
    } else {
      createPostBtn.classList.remove('enabled');
    }
  });

  // evento para el dropdown de privacidad al crear un nuevo post
  const createContainer = currentView.querySelector('.create-post-container');
  const privacyBtn = createContainer.querySelector('.privacy');
  const menu = createContainer.querySelector('ul');
  const options = menu.querySelectorAll('li');

  emojiEvent(createContainer, '#text-area-post', createPostBtn, 'enabled');


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

  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', () => {
    const photoContainer = currentView.querySelector('.photo-container');
    const images = uploadImg.files;
    const privacity = currentView.querySelector('div.privacy');
    if (textArea.textContent || images.length > 0) {
      createPost(user, textArea.textContent, images, privacity.id);
      textArea.textContent = '';
      privacity.innerHTML = setStatePrivacity('public');
      privacity.id = 'public';
      photoContainer.innerHTML = '';
      uploadImg.value = '';
      createPostBtn.classList.remove('enabled');
    }
  });

  const uploadImgProfile = currentView.querySelector('#upload-img-profile');

  const updatePhotoCover = currentView.querySelector('.camera-icon');
  updatePhotoCover.addEventListener('click', () => {
    uploadImgProfile.click();
  });
  uploadImgProfile.addEventListener('click', (event) => {
    event.target.addEventListener('change', (e) => {
      uploadImage(e.target.files[0])
        .then((url) => {
          console.log('Se esta actualizando foto de portada');
          updateImgCoverUser(url, user.uid);
          const coverImg = currentView.querySelector('.user-photo-cover');
          coverImg.setAttribute('src', url);
        });
    });
  });


  window.unsubscribe = getAllPostsBD(page).onSnapshot((querySnapshot) => {
    divPostsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().textContent}`);
      divPostsContainer.appendChild(post(doc.data(), doc.id));
    });
  });

  return currentView;
};
