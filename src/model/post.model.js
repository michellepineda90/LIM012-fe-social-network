/* eslint-disable no-console */
import { auth, db } from '../firebaseInit.js';
// import { objToArray } from '../utils/array.js';

export const createPostBD = postObj => db.collection('posts')
  .add(postObj);

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

export const getDocs = (callback, collection) => db.collection(collection)
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

// export const getDocs = (collection) => {
//   return db.collection(collection)
//     .onSnapshot((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       return data;
//     });
// };


export const deletePostBD = id => db.collection('posts').doc(id).delete();

export const getPostBD = id => db.collection('posts').doc(id).get();

export const updatePostBD = (id, data) => db.collection('posts').doc(id).update(data);

// COMMENTS

export const addCommentBD = commentObj => db.collection('comments').add(commentObj);

export const getAllCommentsBD = postId => db.collection('comments').where('postId', '==', postId).orderBy('date', 'desc');


export const editCommentBD = (id, data) => db.collection('comments').doc(id).update(data);

export const deleteCommentBD = id => db.collection('comments').doc(id).delete();

export const createlikeBD = (postId, likes) => db.collection('posts').doc(postId)
  .update({ likes });

export const removeLike = id => db.collection('likes').doc(id).delete();

// function to test

// export const getCommentsForTest = () => db.collection('comments').get().then(snapshot => objToArray(snapshot.data));
