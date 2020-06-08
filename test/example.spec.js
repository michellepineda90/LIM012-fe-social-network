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

describe('Login', () => {
  it('Should be able to sign in', () => signInUser('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});
