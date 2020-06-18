/* eslint-disable no-console */
import { auth } from '../firebaseInit.js';
import { views } from '../view/index.js';
import {
  getCurrentUser,
} from '../model/user.model.js';
// import {
//   post,
// } from '../view/post.js';
import {
  addCommentBD,
  createPostBD,
} from '../model/post.model.js';
import { uploadImage } from '../model/storage-post.js';

const currentUser = getCurrentUser();

export default (page) => {
  const currentView = views.accountView(currentUser, page);
  const divPostsContainer = currentView.querySelector('.posts-container-home');

  const createCommentObj = (text, user, post) => {
    const commentObj = {
      textContent: text,
      nameUser: user.displayName,
      userId: user.uid,
      photoUser: user.photoURL,
      postId: post.id,
    };
    addCommentBD(commentObj);
  };

  // bring publish botton from comment div and addEventListener

  return currentView;
};

export const createPost = (user, text, images, statePrivacity) => {
  const postObj = {
    textContent: text,
    imageContent: '',
    likes: [],
    comments: [],
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
