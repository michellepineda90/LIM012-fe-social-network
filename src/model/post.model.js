import { db } from '../firebaseInit.js';

export const createPost = postObj => db.collection('posts').add(postObj);

export const getAllPosts = () => db.collection('posts').orderBy('date', 'asc');
// export const getAllPost = () => db.collection('posts').orderBy('date', 'asc').get()
//   .then((querySnapshot) => {
//     const tempDoc = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     // console.log(tempDoc);
//     return tempDoc;
//   });
