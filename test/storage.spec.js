import './firebase.js';

import { uploadImage } from '../src/model/storage-post.js';

const file = {
// en realidad lo que el file es: e.target.files[0]
// {name: "andrea-bday-pari.png", lastModified: 1593127992261, lastModifiedDate: Thu Jun 25 2020
// 17:33:12 GMT-0600 (Central Standard Time), webkitRelativePath: "", size: 31395,…}
  name: 'hola.png',
  type: 'image/png',
};

// lo que retorna uploadImage es una promesa que resuelve a un url
// https://firebasestorage.googleapis.com/v0/b/red-social-32aa8.appspot.com/o/PostsImages%2Fandrea-bday-pari.png?alt=media&token=1fd458ce-4409-4848-ab07-70d4d74c7747
describe('uploadImage', () => {
  test('should return the path of the img file', () => uploadImage(file).then((url) => {
    console.log(url);
    expect(url).toBe('/PostsImages/hola.png');
  }));
});
