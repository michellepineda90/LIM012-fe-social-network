import { views } from '../view/index.js';
import { createPost, renderAllPosts } from './postController.js';
import { currentUser, signOut, getUsers } from '../model/user.model.js';

export default () => {
  const user = currentUser();
  const currentView = views.homeView(user);

  const menuBtn = currentView.querySelector('.menu-icon');

  const uploadImgBtn = currentView.querySelector('#upload-img-btn');
  const uploadImg = currentView.querySelector('#upload-img');
  const container = currentView.querySelector('.photo-container');

  const divPostsContainer = currentView.querySelector('.posts-container');
  const createPostBtn = currentView.querySelector('.post-btn');

  // llama a la BD para mostrar todos los post registrados
  renderAllPosts(divPostsContainer);

  // btn para desplegar menu
  menuBtn.addEventListener('click', () => {
    const menu = currentView.querySelector('#menu');
    const state = menu.style.display;
    getUsers()
      .then(data => console.log(data));
    menu.style.display = (state === 'block') ? 'none' : 'block';
  });

  // boton para cargar imagenes para publicar
  uploadImgBtn.addEventListener('click', () => {
    uploadImg.click();
    uploadImg.addEventListener('change', (event) => {
      const img = document.createElement('img');
      img.classList.add('img-post');
      container.append(img);
      const path = URL.createObjectURL(event.target.files[0]);
      img.setAttribute('src', path);
    });
  });

  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', () => {
    const photoContainer = currentView.querySelector('.photo-container');
    const images = photoContainer.querySelectorAll('.img-post');
    const textPost = currentView.querySelector('.text-post');
    if (textPost.value || images.length > 0) {
      const srcImages = [];
      images.forEach(img => srcImages.push(img.src));
      createPost(user, textPost.value, srcImages, divPostsContainer);
      textPost.value = '';
      photoContainer.innerHTML = '';
    }
  });

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);

  return currentView;
};
