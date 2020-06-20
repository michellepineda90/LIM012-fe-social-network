import { views } from '../view/index.js';
import { signOut, getCurrentUser } from '../model/user.model.js';
import { post, setStatePrivacity } from '../view/post.js';
import { getAllPostsBD } from '../model/post.model.js';
import { createPost } from './postController.js';

export default (page) => {
  // llama a la BD para mostrar todos los post registrados
  const user = getCurrentUser();

  const currentView = views.accountView(user, page);
  const menuBtn = currentView.querySelector('.menu-icon');

  const uploadImgBtn = currentView.querySelector('#upload-img-btn');
  const uploadImg = currentView.querySelector('#upload-img');
  const container = currentView.querySelector('.photo-container');
  const divPostsContainer = currentView.querySelector('.posts-container');

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

  // evento que escucha al input para ver si hay algo que
  // publicar de ser asi, activa el boton de publicar
  const textArea = currentView.querySelector('.text-post');
  textArea.addEventListener('input', (e) => {
    if (e.target.value) {
      createPostBtn.disabled = false;
      createPostBtn.classList.add('enabled');
    } else {
      createPostBtn.disabled = true;
      createPostBtn.classList.remove('enabled');
    }
  });

  // evento para el dropdown de privacidad al crear un nuevo post
  const createContainer = currentView.querySelector('.create-post-container');
  const privacyBtn = createContainer.querySelector('.privacy');
  const menu = createContainer.querySelector('ul');
  const options = menu.querySelectorAll('li');


  const emojiIconBtn = createContainer.querySelector('.emoji-icon');
  const emojisContainer = createContainer.querySelector('.emoji-container');
  emojiIconBtn.addEventListener('click', () => {
    emojisContainer.classList.toggle('flex');
  });

  document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('emoji')) {
      console.log(e.target.innerText);
      textArea.textContent += e.target.textContent;
    }
  });

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
    console.log('**creando nueva publicacion ***');
    createPost(user, textArea.value, images, privacity.id);
    textArea.value = '';
    privacity.innerHTML = setStatePrivacity('public');
    privacity.id = 'public';
    photoContainer.innerHTML = '';
    uploadImg.value = '';
    createPostBtn.disabled = true;
    createPostBtn.classList.remove('enabled');
  });

  getAllPostsBD(page).onSnapshot((querySnapshot) => {
    divPostsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().textContent}`);
      divPostsContainer.appendChild(post(doc.data(), doc.id));
    });
  });

  return currentView;
};
