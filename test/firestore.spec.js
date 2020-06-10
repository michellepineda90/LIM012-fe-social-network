import './firebase'; // debería importar esto?

import MockFirebase from 'mock-cloud-firestore';

import { registerUser, getUsers } from '../src/model/user.model.js';


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

// const registerUser = (idUser, data) => db.collection('users').doc(idUser).set(data);

describe('registerUser', () => {
  it('Should add a user to database collection', done => registerUser('user_b', { name: 'Git456', photoURL: 'photoURL', email: 'git456@gmail.com' })
    .then(() => getUsers(
      (data) => {
        const result = data.find(user => user.name === 'Git345');
        expect(result.name).toBe('Git345');
        done();
      },
    )));
});
