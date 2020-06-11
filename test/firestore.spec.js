import './firebase';
import MockFirebase from 'mock-cloud-firestore';

import { registerUserBD, getUsers } from '../src/model/user.model.js';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_a: {
          name: 'Luna123',
          photoURL: 'photoURL',
          email: 'lunachan@gmail.com',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('registerUserBD', () => {
  it('Debería porder agregar una nota', done => registerUserBD({ name: 'Git456' })
    .then(() => getUsers(
      (data) => {
        const result = data.find(user => user.name === 'Git456');
        expect(result.name).toBe('Git456');
        done();
      },
    )));
});
