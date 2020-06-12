import { views } from '../view/index.js';
import { post } from '../view/post.js';
import { createPost, setStatePrivacity } from './postController.js';
import { signOut, getCurrentUser } from '../model/user.model.js';
import { getAllPostsBD } from '../model/post.model.js';


export default () => {
  // llama a la BD para mostrar todos los post registrados
  const user = getCurrentUser();

  const currentView = views.homeView(user);
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
    // img.setAttribute('src', path);
  });

  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const photoContainer = currentView.querySelector('.photo-container');
    const images = photoContainer.querySelectorAll('.img-post');
    const textPost = currentView.querySelector('.text-post');
    const privacity = currentView.querySelector('div.privacy');
    if (textPost.value || images.length > 0) {
      const srcImages = [];
      images.forEach(img => srcImages.push(img.src));
      createPost(user, textPost.value, srcImages, privacity.id);
      textPost.value = '';
      photoContainer.innerHTML = '';
      privacity.innerHTML = setStatePrivacity('public');
      privacity.id = 'public';
    }
  });

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);


  const updatePostView = (doc) => {
    console.log(doc.id);
    const divPost = document.querySelector(`div#${doc.id}`);
    divPost.querySelector('p').textContent = doc.data().textContent;
    const priBtn = divPost.querySelector('i.privacy-icon');
    priBtn.outerHTML = `<i class='bx ${doc.data().privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'></i>`;
  };

  //  muestre el post creado en la interface
  const renderPost = (doc) => {
    const divPost = document.createElement('div');
    divPost.classList.add('post');
    divPost.id = doc.id;
    divPost.innerHTML = post(doc.data(), doc.id);
    divPostsContainer.appendChild(divPost);
  };

  // muestra todos los post registrados en la BD
  const renderAllPosts = () => getAllPostsBD()
    .onSnapshot((snapshot) => {
      const changes = snapshot.docChanges();
      console.log(changes);
      changes.forEach((change) => {
        console.log(change.type);
        if (change.type === 'added') {
          console.log('renderizando posts');
          renderPost(change.doc);
        } if (change.type === 'removed') {
          console.log('eliminando algo');
          const divPost = divPostsContainer.querySelector(`#${change.doc.id}`);
          divPostsContainer.removeChild(divPost);
        } if (change.type === 'modified') {
          console.log('renderizando post editado');
          updatePostView(change.doc);
          // const divPost = divPostsContainer.querySelector(`div#${doc.id}`);
          // divPost.querySelector('p').textContent = doc.data().textContent;
          // const priBtn = divPost.querySelector('i.privacy-icon');
          // priBtn.outerHTML = `<i class='bx ${doc.data().privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon'></i>`;
        }
      });
    });

  renderAllPosts();

  return currentView;
};
