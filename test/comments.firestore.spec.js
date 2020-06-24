import './firebase';
import MockFirebase from 'mock-cloud-firestore';

import {
  addCommentBD, getCommentsForTest, editCommentBD, deleteCommentBD,
} from '../src/model/post.model.js';

const fixtureData = {
  __collection__: {
    comments: {
      __doc__: {
        abc1: {
          textContent: 'holiholiholi',
          postId: 'a1b2c3',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addCommentBD', () => {
  it('Should add a comment in Firestore DB collection, and check it has been correctly linked to a given post',
    () => addCommentBD({ textContent: 'holiholiholi', postId: 'a1b2c3' })
      .then(() => getCommentsForTest())
      .then((data) => {
        const result = data.find(comment => comment.textContent === 'holiholiholi');
        expect(result).toMatchObject({ textContent: 'holiholiholi', postId: 'a1b2c3' });
      }));
});

describe('deleteCommentBD', () => {
  it('Should add a comment in Firestore DB collection, and check it has been correctly linked to a given post',
    () => deleteCommentBD('abc1')
      .then(() => getCommentsForTest())
      .then((data) => {
        const result = data.find(comment => comment.id === ' abc1');
        expect(result).toBe(undefined);
      }));
});
