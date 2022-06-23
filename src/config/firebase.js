import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA8Zyz9kUtUKVjhZm-w9W18wAV5LHPd3wI',
  authDomain: 'meet-force.firebaseapp.com',
  databaseURL: 'https://meet-force-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'meet-force',
  storageBucket: 'meet-force.appspot.com',
  messagingSenderId: '759835214615',
  appId: '1:759835214615:web:172a5c9793a0b876496d52',
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
