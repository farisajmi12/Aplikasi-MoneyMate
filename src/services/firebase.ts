import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { /* config dari Firebase console */ };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);