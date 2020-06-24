import './firebase';
import MockFirebase from 'mock-cloud-firestore';
import { fixtureData } from './fictureData.js';

import {
  addCommentBD, getCommentsForTest, editCommentBD, deleteCommentBD,
  createPostBD, updatePostBD, deletePostBD, getDocsForTest,
} from '../src/model/post.model.js';

import { getUsers, registerUserBD } from '../src/model/user.model.js';

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addCommentBD', () => {
  it('Should add a comment in Firestore DB collection, and check it has been correctly linked to a given post',
    () => addCommentBD({ textContent: 'holiholiholi', postId: 'a1b2c3' })
      .then(() => getCommentsForTest())
      .then((data) => {
        console.log(data);
        const result = data.find(comment => comment.textContent === 'holiholiholi');
        expect(result).toMatchObject({ textContent: 'holiholiholi', postId: 'a1b2c3' });
      }));
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
        .then(() => getDocsForTest())
        .then((data) => {
          const result = data.find(post => (post.textContent === 'primer post user_a' && post.idUser === 'user_a'));
          expect(result).toMatchObject({ textContent: 'primer post user_a', userId: 'user_1' });
        });
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
        .then(() => getDocsForTest('posts'))
        .then((data) => {
          const result = data.find(post => (post.id === 'post_2'));
          expect(result).toMatchObject(obj);
        });
    });
});
describe('deletePostBD', () => {
  it('Should delete a post in Firestore DB collection',
    () => {
      deletePostBD('post_1')
        .then(() => getDocsForTest('posts'))
        .then((data) => {
          const result = data.find(post => (post.id === 'post_1'));
          expect(result).toBeUndefined();
        });
    });
});

// USERS

describe('registerUserBD', () => {
  it('Should register a new user in Firestore DB', () => registerUserBD('1234-Git', {
    name: 'Git456',
    email: 'git456@gmail.com',
  })
    .then(() => getUsers())
    .then((data) => {
      const result = data.find(user => user.name === 'Git456');
      expect(result).toMatchObject({ name: 'Git456' });
    }));
});
