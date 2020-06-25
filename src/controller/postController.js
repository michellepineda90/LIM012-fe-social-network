import {
  addCommentBD,
  createPostBD,
} from '../model/post.model.js';
import { uploadImage } from '../model/storage-post.js';

export const createCommentObj = (text, user, postId) => {
  const commentObj = {
    textContent: text,
    nameUser: user.displayName,
    userId: user.uid,
    photoUser: user.photoURL,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    postId,
  };
  addCommentBD(commentObj);
};

export const createPost = (user, text, images, statePrivacity) => {
  const postObj = {
    textContent: text,
    imageContent: '',
    likes: [],
    privacity: statePrivacity,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    nameUser: user.displayName,
    idUser: user.uid,
    photoUser: user.photoURL,
  };
  if (images[0]) {
    uploadImage(images[0])
      .then((url) => {
        postObj.imageContent = url;
        createPostBD(postObj);
      });
  } else {
    createPostBD(postObj);
  }
};
