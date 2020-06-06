import './firebase';
import {
  signInUser,
  signInWithGoogle,
  signInWithFacebook,
} from '../src/model/user.model.js';


describe('Login', () => {
  it('Deberia iniciar sesión', () => signInUser('lala@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('lala@gmail.com');
    }));
});

// describe(' Function createUser()', (user) => {

// });

describe('Function signInWithGoogle', () => {
  it('Debería iniciar sesión con google', () => signInWithGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
describe('Function signInWithFacebook', () => {
  it('Debería iniciar sesión con facebook', () => signInWithFacebook()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
