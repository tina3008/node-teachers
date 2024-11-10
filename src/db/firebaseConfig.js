import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs/promises';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCkxPo19SKC6V2-8LbTZ2GtxLW5CqWoePs',
  authDomain: 'dbproject-68bad.firebaseapp.com',
  databaseURL: 'https://dbproject-68bad-default-rtdb.firebaseio.com',
  projectId: 'dbproject-68bad',
  storageBucket: 'dbproject-68bad.firebasestorage.app',
  messagingSenderId: '779058037494',
  appId: '1:779058037494:web:23b2f2bf8d67e6169ee2d7',
  measurementId: 'G-77W6YEJ7MY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);


export function initializeFirebase() {

  const serviceAccount = path.join(process.cwd(), 'serviceAccountKey.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dbproject-68bad-default-rtdb.firebaseio.com/',
  });
  return admin.database();
}
