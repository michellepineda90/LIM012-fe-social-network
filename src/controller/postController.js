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
} from '../model/post.model.js';

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
