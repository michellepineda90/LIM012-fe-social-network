const firebaseConfig = {
  apiKey: 'AIzaSyBEeDtN0WAobe3f72yA5cdFyFZG4Arxu70',
  authDomain: 'red-social-32aa8.firebaseapp.com',
  databaseURL: 'https://red-social-32aa8.firebaseio.com',
  projectId: 'red-social-32aa8',
  storageBucket: 'red-social-32aa8.appspot.com',
  messagingSenderId: '841161545815',
  appId: '1:841161545815:web:ba93c27b4c4f0b38ee2b12',
  measurementId: 'G-J0VYEJMB67',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
