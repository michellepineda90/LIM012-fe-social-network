import './firebase';
import {
  signInUser,
  createUser,
  signInWithGoogle,
  signInWithFacebook,
  sendConfirmationEmail,
} from '../src/model/user.model.js';


describe('Function signInUser()', () => {
  it('Deberia iniciar sesión', () => signInUser('lala06@gmail.com', '123456')
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('Function createUser()', () => {
  it('Debería enviar una mensaje de verificación al usuario que se ha registrado', () => {
    createUser('lucy@gmail.com', '123456')
      .then(() => {
        expect(sendConfirmationEmail).toBe('REGISTRADO EXITOSAMENTE');
      });
  });
});

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
