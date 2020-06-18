/* eslint-disable no-console */
import { views } from '../view/index.js';
import { signOut, getCurrentUser } from '../model/user.model.js';
import { setStatePrivacity, post } from '../view/post.js';
import { getAllPostsBD } from '../model/post.model.js';
import { createPost } from './postController.js';


export default (page) => {
  
  const user = getCurrentUser();
  console.log('esta pagina es', page);
  const currentView = views.accountView(user, page);
  const menuBtn = currentView.querySelector('.menu-icon');

  const uploadImgBtn = currentView.querySelector('#upload-img-btn');
  const uploadImg = currentView.querySelector('#upload-img');
  const container = currentView.querySelector('.photo-container');

  const divPostsContainer = currentView.querySelector('.posts-container');
  const createPostBtn = currentView.querySelector('.post-btn');

  const btnSalir = currentView.querySelector('#btn-salir');
  btnSalir.addEventListener('click', signOut);
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

  // Si hay imagenes que fueron cargadas en el input aqui se
  //  crean el div para que las imagenes se puedan visualizar en miniatura
  uploadImg.addEventListener('change', (event) => {
    const img = document.createElement('div');
    img.classList.add('div-img');
    const path = URL.createObjectURL(event.target.files[0]);
    img.innerHTML = `<i class='bx bx-x'></i><img class="img-post" src="${path}">`;
    container.append(img);
    const cross = img.querySelector('.bx-x');
    createPostBtn.disabled = false;
    createPostBtn.classList.add('enabled');

    // Evento del boton X para eliminar la imagen cargada
    cross.addEventListener('click', () => {
      container.removeChild(img);
      createPostBtn.disabled = true;
      createPostBtn.classList.remove('enabled');
    });
  });

  // evento que escucha al input para ver si hay algo que
  // publicar de ser asi, activa el boton de publicar
  const textPost = currentView.querySelector('.text-post');
  textPost.addEventListener('input', (e) => {
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
    createPost(user, textPost.value, images, privacity.id);
    textPost.value = '';
    privacity.innerHTML = setStatePrivacity('public');
    privacity.id = 'public';
    photoContainer.innerHTML = '';
    uploadImg.value = '';
    createPostBtn.disabled = true;
    createPostBtn.classList.remove('enabled');
  });

  // Llama a todos los posts existentes en la BD y renderiza(crea
  //  para mostrar visualmente) cada uno de ellos llamando a la funcion post
  // que es el template de un post, pasandole la data de cada post y el id que luego es asignado al div post que se crea
  getAllPostsBD(page).onSnapshot((querySnapshot) => {
    console.log(`------------${page}--------------------`);
    divPostsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().textContent}`);
      divPostsContainer.appendChild(post(doc.data(), doc.id));
    });
  });


  return currentView;
};
