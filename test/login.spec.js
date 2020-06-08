import {
  signInUser,
  sendEmail,
  createUser,
} from '../src/model/user.model';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication(); // const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

// npm install firebase-mock --save-dev ya lo hizo lucy?

describe('signInUser', () => {
  it('Debería poder iniciar sesion', () => signInUser('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});

describe('sendEmail', () => {
  it('Should be able to sign in', () => sendEmail('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});

describe('createUser', () => {
  it('Should be able to sign in', () => createUser('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});
