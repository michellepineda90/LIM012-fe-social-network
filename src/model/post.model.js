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


// COMMENTS

export const addCommentBD = commentObj => db.collection('comments').add(commentObj);

export const getCommentBD = id => db.collection('comments').doc(id).get();

export const editCommentBD = (id, data) => db.collection('comments').doc(id).update(data);

export const deleteCommentBD = id => db.collection('comments').doc(id).delete();
