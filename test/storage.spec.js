import './firebase.js';

import { uploadImage } from '../src/model/storage-post.js';

const file = {
  name: 'hola.png',
};

describe('uploadImage', () => {
  test('should return the path of the img file', () => uploadImage(file).then((url) => {
    expect(url).toBe('/PostsImages/hola.png');
  }));
});
