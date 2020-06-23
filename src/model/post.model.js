/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';

export const createPostBD = postObj => db.collection('posts')
  .add(postObj)
  .then(() => console.log('se creo post con exito'))
  .catch(err => console.log('hubo error al crear post', err));

// export const getAllPostsBD = (route) => db.collection('posts').orderBy('date');
export const getAllPostsBD = (route) => {
  const collectionRef = db.collection('posts');
  let result;
  if (route === 'profile') {
    result = collectionRef.where('idUser', '==', auth.currentUser.uid).orderBy('date', 'asc');
  } else if (route === 'home') {
    result = collectionRef.where('privacity', '==', 'public').orderBy('date', 'asc');
  }
  return result;
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

export const getAllCommentsBD = postId => db.collection('comments').where('postId', '==', postId).orderBy('date', 'desc');

export const editCommentBD = (id, data) => db.collection('comments').doc(id).update(data);

export const deleteCommentBD = id => db.collection('comments').doc(id).delete()
  .then(() => console.log('Comment eliminado'))
  .catch(() => console.log('Error'));
// export const createlikeBD = likeObj => db.collection('likes')
//   .add(likeObj)
//   .then(() => console.log('Funcionando LIKE!!!'))
//   .catch(err => console.log('ERROR LIKE', err));

export const createlikeBD = (postId, likes) => db.collection('posts').doc(postId)
  .update({ likes })
  .then(() => console.log('Funcionando LIKE!!!'))
  .catch(err => console.log('ERROR LIKE', err));

export const removeLike = id => db.collection('likes').doc(id).delete();

// export const checkLike = (userId, postId) => db.collection('likes').where('postId', '==', postId).where('userId', '==', userId)
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       result = doc.data();
//     });
//   });
