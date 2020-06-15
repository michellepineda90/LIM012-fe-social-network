import { storage } from '../firebaseInit.js';

export const uploadImage = (file) => {
  // const user = firebase.auth().currentUser;
  const storageRef = storage.ref(`/PostsImages/${file.name}`);
  return storageRef.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .catch(err => console.log(err));
};
