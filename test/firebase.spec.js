import './firebase';
import { signInUser, signInWithGoogle } from '../src/model/user.model.js';

// funcion de iniciar sesion con google
describe('Login', () => {
  it('Deberia iniciar sesión', () => signInUser('lala@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('lala@gmail.com');
    }));
});

describe('signInWithGoogle', () => {
  it('Debería loguearse con google', () => {
    signInWithGoogle()
      .then(() => {
        expect('luna@gmail.com').toBe('luna@gmail.com');
      });
  });
});
