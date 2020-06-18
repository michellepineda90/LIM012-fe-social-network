import { auth, db } from '../firebaseInit.js';

export const createPostBD = postObj => db.collection('posts')
  .add(postObj)
  .then(() => console.log('se creo post con exito'))
  .catch(err => console.log('hubo error al crear post', err));

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

export const deletePostBD = id => db.collection('posts').doc(id).delete();

export const getPostBD = id => db.collection('posts').doc(id).get();

export const updatePostBD = (id, data) => db.collection('posts').doc(id).update(data);

// export const likedPost = (id) => {
//   const doc = db.collection('posts').doc(id).get();
//   doc.then((result) => {
//     const likes = result.data().likes;
//     console.log(likes);
//     if (likes.find(value => value === auth.currentUser)) {
//       likes.filter(item => item !== auth.currentUser);
//       console.log('si esta');
//     } else {
//       result.data().likes.push(auth.currentUser);
//       console.log('no esta');
//     }
//     db.collection('posts').doc(id).update({ likes });
//   });
// };
export const createlikeBD = likeObj => db.collection('likes')
  .add(likeObj)
  .then(() => console.log('Funcionando LIKE!!!'))
  .catch(err => console.log('ERROR LIKE', err));

export const removeLike = id => db.collection('likes').doc(id).delete();

export const checkLike = (userId, postId) => {
  const collectionLik = db.collection('likes').where('postId', '==', postId).where('userId', '==', userId);
  return collectionLik.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => doc.data());
  // return collectionLik;
  });
};
