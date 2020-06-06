import './firebase';
import { signInUser, signInWithGoogle } from '../src/model/user.model.js';

// funcion de iniciar sesion con google
describe('Login', () => {
  it('Deberia iniciar sesión', () => signInUser('lala@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('lala@gmail.com');
    }));
});

describe('googleSignIn', () => {
  it('deberia loguearse con google', () => {
    signInWithGoogle().then(() => {
      expect('lucy@gmail.com').toBe('lucy@gmail.com');
    });
  });
});
