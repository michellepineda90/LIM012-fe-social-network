import './firebase';
import MockFirebase from 'mock-cloud-firestore';

import { registerUserBD, getUsers } from '../src/model/user.model.js';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_a: {
          name: 'Luna123',
          email: 'lunachan@gmail.com',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

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
