import { db } from '../firebaseInit.js';

export const createPostBD = postObj => db.collection('posts').add(postObj);

export const getAllPostsBD = () => db.collection('posts').orderBy('date');
