import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqANwqIaiF2fki60F8yLMH6RL5247WbZ4",
    authDomain: "randomgamesaver.firebaseapp.com",
    projectId: "randomgamesaver",
    storageBucket: "randomgamesaver.appspot.com",
    messagingSenderId: "614746125641",
    appId: "1:614746125641:web:c0eaebf70bd49271715698"
  };

initializeApp(firebaseConfig)
export const db = getFirestore()

