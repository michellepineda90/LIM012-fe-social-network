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
  });

  // boton para hacer una publicacion enviando los datos insertados(imagen o texto)
  createPostBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const photoContainer = currentView.querySelector('.photo-container');
    const images = uploadImg.files;
    const textPost = currentView.querySelector('.text-post');
    const privacity = currentView.querySelector('div.privacy');
    if (textPost.value || images.length > 0) {
      createPost(user, textPost.value, images, privacity.id);
      textPost.value = '';
      privacity.innerHTML = setStatePrivacity('public');
      privacity.id = 'public';
      photoContainer.innerHTML = '';
      uploadImg.value = '';
    }
  });

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);


  const updatePost = (doc) => {
    console.log('post que se edita', doc.id);
    const divPost = divPostsContainer.querySelector(`#${doc.id}`);
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
  // const renderAllPosts = () => getAllPostsBD()
  //   .onSnapshot((snapshot) => {
  //     const changes = snapshot.docChanges();
  //     changes.forEach((change) => {
  //       if (change.type === 'added') {
  //         renderPost(change.doc);
  //       } if (change.type === 'removed') {
  //         const divPost = divPostsContainer.querySelector(`#${change.doc.id}`);
  //         divPostsContainer.removeChild(divPost);
  //       } if (change.type === 'modified') {
  //         updatePostView(change.doc);
  //       }
  //     });
  //   });
  const renderAllPosts = () => {
    const allPosts = getAllPostsBD();
    allPosts.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          renderPost(change.doc);
          console.log('New Post', change.doc.data());
        }
        if (change.type === 'modified') {
          updatePost(change.doc);
          console.log('Modified Post', change.doc.data());
        }
        if (change.type === 'removed') {
          const divPost = divPostsContainer.querySelector(`#${change.doc.id}`);
          divPostsContainer.removeChild(divPost);
          console.log('Removed Post', change.doc.data());
        }
      });
    });
  };

  renderAllPosts();

  return currentView;
};
