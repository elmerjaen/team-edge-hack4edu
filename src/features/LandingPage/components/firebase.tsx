// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUF_3gmPGIyMdOhwV31aEoe4Y3l-LrrBY',
  authDomain: 'team-edge.firebaseapp.com',
  projectId: 'team-edge',
  storageBucket: 'team-edge.appspot.com',
  messagingSenderId: '457450067405',
  appId: '1:457450067405:web:2b210273c64590e08c6084',
  measurementId: 'G-NHGKK64ERP'
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
