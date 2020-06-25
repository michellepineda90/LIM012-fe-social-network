const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();

mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
);
