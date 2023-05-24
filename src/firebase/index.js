import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBJLx7gMCXp86_83fGOZrC90uxB5pscIQM',
    authDomain: 'muslimref-ff738.firebaseapp.com',
    projectId: 'muslimref-ff738',
    storageBucket: 'muslimref-ff738.appspot.com',
    messagingSenderId: '568153938122',
    appId: '1:568153938122:web:b795fc6a22f1b1b878bc33',
    measurementId: 'G-DEV361D5ZY',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
