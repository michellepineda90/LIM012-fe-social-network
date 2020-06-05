import {
  registerUserOnDB,
  createUser,
  signInUser,
} from '../src/model/user.model';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();

mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

// npm install firebase-mock --save-dev

describe('User login with email', () => {
  it('Should successfully log in a registered email user to app', (done) => {
    signInUser().then((user) => {
      expect(user.email).toBe('');
      expect(user.password).toBe('');
      done();
    });
  });
});
