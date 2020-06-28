const firebasemock = require('firebase-mock');

const storage = () => ({
  ref: path => ({
    put: () => new Promise((resolve) => {
      resolve({
        ref: {
          getDownloadURL: () => path,
        },
      });
    }),
  }),
});

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = storage();

mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
);
