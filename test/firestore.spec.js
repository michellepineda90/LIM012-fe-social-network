/* eslint-disable no-console */
import './firebase';
import MockFirebase from 'mock-cloud-firestore';
import { fixtureData } from './fixtureData.js';

import {
  addCommentBD, editCommentBD, deleteCommentBD,
  createPostBD, updatePostBD, deletePostBD, getDocs,
} from '../src/model/post.model.js';

// import { getUsers, registerUserBD } from '../src/model/user.model.js';

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addCommentBD', () => {
  it('Should add a comment in Firestore DB collection', done => addCommentBD({ textContent: 'hola mundo', postId: 'post_1' })
    .then(() => getDocs((data) => {
      const result = data.find(comment => comment.textContent === 'hola mundo');
      // console.log('result add => ', result);
      expect(result).toMatchObject({ textContent: 'hola mundo', postId: 'post_1' });
      done();
    }, 'comments')));
});

describe('editCommentBD', () => {
  it('Should edit a comment in Firestore DB collection',
    done => editCommentBD('comment01', { textContent: 'manzana', postId: 'post_2' })
      .then(() => getDocs((data) => {
        const result = data.find(comment => comment.id === 'comment01');
        // console.log('result edit => ', result);
        expect(result.textContent).toBe('manzana');
        done();
      }, 'comments')));
});

describe('deleteCommentBD', () => {
  it('Should delete a comment from Firestore DB collection',
    done => deleteCommentBD('comment_1')
      .then(() => getDocs((data) => {
        const result = data.find(comment => comment.id === 'comment_1');
        // console.log('result delete => ', result);
        expect(result).toBeUndefined();
        done();
      }, 'comments')));
});


// POSTS
describe('addPostBD', () => {
  it('Should create a post in Firestore DB collection, and check it has been correctly linked to a given user',
    () => {
      const obj = {
        idUser: 'user_1',
        textContent: 'primer post user_a',
        imageContent: '',
        privacity: 'public',
        likes: ['user_1', 'user_2'],
      };
      createPostBD(obj)
        .then(() => getDocs((data) => {
          const result = data.find(post => (post.textContent === 'primer post user_a' && post.idUser === 'user_1'));
          // console.log('result add post => ', result);
          expect(result).toMatchObject({ textContent: 'primer post user_a', userId: 'user_1' });
        }, 'posts'));
    });
});

describe('updatePostBD', () => {
  it('Should update a post in Firestore DB collection',
    () => {
      const obj = {
        textContent: 'primer post user_a',
        imageContent: '',
        privacity: 'public',
      };
      updatePostBD('post_2', obj)
        .then(() => getDocs((data) => {
          const result = data.find(post => (post.id === 'post_2'));
          // console.log('result edit post => ', result);
          expect(result).toMatchObject(obj);
        }, 'posts'));
    });
});
describe('deletePostBD', () => {
  it('Should delete a post in Firestore DB collection',
    () => {
      deletePostBD('post_2')
        .then(() => getDocs((data) => {
          // console.log('data =>', data);
          const result = data.find(post => (post.id === 'post_1'));
          // console.log('result delete post => ', result);
          expect(result).toBeUndefined();
        }, 'posts'));
    });
});

// USERS

// describe('registerUserBD', () => {
//   it('Should register a new user in Firestore DB', () => registerUserBD('1234-Git', {
//     name: 'Git456',
//     email: 'git456@gmail.com',
//   })
//     .then(() => getUsers())
//     .then((data) => {
//       const result = data.find(user => user.name === 'Git456');
//       expect(result).toMatchObject({ name: 'Git456' });
//     }));
// });
