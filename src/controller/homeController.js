import { views } from '../view/index.js';
// import { post } from '../view/post.js';
import { createPost, post, setStatePrivacity } from './postController.js';
import { signOut, getCurrentUser } from '../model/user.model.js';
import { getAllPostsBD } from '../model/post.model.js';
// import { render } from 'node-sass';


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

  // funcionalidad para dropdown de privacidad
  const privacyBtn = currentView.querySelector('.privacy.btn');
  const privacyMenu = currentView.querySelector('.privacy-options');
  privacyBtn.addEventListener('click', () => {
    privacyMenu.classList.toggle('show');
    if (privacyMenu.classList.contains('show')) {
      const options = privacyMenu.querySelectorAll('li');
      options.forEach((option) => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          privacyBtn.id = option.id;
          privacyBtn.innerHTML = `${option.innerHTML}<i class='bx bxs-down-arrow' ></i>`;
          privacyMenu.classList.remove('show');
        });
      });
    }
  });

  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const photoContainer = currentView.querySelector('.photo-container');
    const images = uploadImg.files;
    const textPost = currentView.querySelector('.text-post');
    const privapost = currentView.querySelector('div.privacy');
    if (textPost.value || images.length > 0) {
      createPost(user, textPost.value, images, privapost.id);
      textPost.value = '';
      privapost.innerHTML = setStatePrivacity('public');
      privapost.id = 'public';
      photoContainer.innerHTML = '';
      uploadImg.value = '';
    }
  });

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);


  //  muestre el post creado en la interface
  const renderPost = (doc) => {
    console.log('post que se crea', doc.id);
    const divPost = post(doc.data(), doc.id);
    divPost.id = doc.id;
    // divPostsContainer.insertBefore(divPost, divPostsContainer.firstChild);
    divPostsContainer.append(divPost);
  };


  getAllPostsBD(page).onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach((change) => {
      if (change.type === 'added') {
        renderPost(change.doc);
        console.log('New post: ', change.doc.data().textContent);
      } else if (change.type === 'removed') {
        console.log('Removed post: ', change.doc.data().textContent);
        console.log('div id: ', change.doc.id);
        const divPost = divPostsContainer.querySelector(`#${change.doc.id}`);
        divPostsContainer.removeChild(divPost);
      }
    });
  });

  window.onclick = (event) => {
    if (!event.target.matches('.dropdown-btn')) {
      const dropdowns = currentView.querySelectorAll('.dropdown-menu');
      for (let i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    } if (!event.target.matches('.privacy.btn')) {
      console.log('other button');
      privacyMenu.classList.remove('show');
    }
  };


  return currentView;
};
