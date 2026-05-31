import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVvzRqIAU7T7cQ0Q59_Qk0W-jAASZLOiI",
  authDomain: "ahmedabad-pg-finder.firebaseapp.com",
  projectId: "ahmedabad-pg-finder",
  storageBucket: "ahmedabad-pg-finder.firebasestorage.app",
  messagingSenderId: "880905929729",
  appId: "1:880905929729:web:5142f9de3b638cab27ac00"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
