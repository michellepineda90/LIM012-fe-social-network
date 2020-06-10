/* eslint-disable no-console */
import { createPostBD, getAllPostsBD } from '../model/post.model.js';
import { post } from '../view/post.js';

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
    nameUser: user.name,
    idUser: user.id,
    photoUser: user.photo,
  };
  createPostBD(postObj)
    .then(() => console.log('Post creado con exito!'))
    .catch(err => console.log(err));
};

//  muestre el post creado en la interface
const renderPost = (doc, container) => {
  const divPost = document.createElement('div');
  divPost.classList.add('post');
  divPost.setAttribute('post-id', doc.id);
  divPost.innerHTML = post(doc.data());
  container.append(divPost);
};

// muestra todos los post registrados en la BD
export const renderAllPosts = container => getAllPostsBD()
  .onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === 'added') {
        console.log('renderizando posts');
        renderPost(change.doc, container);
      } else if (change.type === 'removed') {
        console.log('eliminando algo');
      }
    });
  });
