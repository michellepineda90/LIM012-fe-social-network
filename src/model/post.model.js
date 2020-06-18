import { auth, db } from '../firebaseInit.js';

export const createPostBD = postObj => db.collection('posts')
  .add(postObj)
  .then(() => console.log('se creo post con exito'))
  .catch(err => console.log('hubo error al crear post', err));

// export const getAllPostsBD = (route) => db.collection('posts').orderBy('date');
export const getAllPostsBD = (route) => {
  console.log('estamos en la pagina ', route);
  const collectionRef = db.collection('posts');
  if (route === 'profile') {
    return collectionRef
      .where('idUser', '==', auth.currentUser.uid)
      .orderBy('date', 'asc');
  }
  return collectionRef.where('privacity', '==', 'public').orderBy('date', 'asc');
};

export const deletePostBD = id => db.collection('posts').doc(id).delete()
  .then(() => console.log('Post eliminado!!'))
  .catch(() => console.log('Error al eliminar post!!'));

export const getPostBD = id => db.collection('posts').doc(id).get();

export const updatePostBD = (id, data) => db.collection('posts').doc(id).update(data)
  .then(() => console.log('Los cambios se guardaron exitosamente'))
  .catch(err => console.log('No se pudo guardar los cambios', err));

// addComment: recibe el id del postObj al que está siendo vinculado (genera también un id con el método add)
// recibe el commentObj (com.text, com.userName, com.userPhoto) del auth.currentUser
// añade el commentObj al postObj

export const addComment = (id, commentObj) => db.collection('comments').add(commentObj);

//

export const editComment = () => {};

// deleteComment: recibe el id del postObj que contiene el comentario a borrar
// el índice del comentario en el commentsArray
// hace slice del indice y retorna el array modificado

export const deleteComment = (id) => {
  getPostBD(id)
    .then((result) => {
      const commentsArray = result.data().comments;
    });
};
