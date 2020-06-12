import { db } from '../firebaseInit.js';

export const createPostBD = postObj => db.collection('posts').add(postObj);

export const getAllPostsBD = () => db.collection('posts').orderBy('date');

export const deletePostBD = id => db.collection('posts').doc(id).delete();

export const getPostBD = id => db.collection('posts').doc(id).get();

export const updatePostBD = (id, data) => db.collection('posts').doc(id).set(data);
