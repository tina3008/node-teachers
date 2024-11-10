import admin from 'firebase-admin';
import { env } from '../utils/env.js';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCkxPo19SKC6V2-8LbTZ2GtxLW5CqWoePs',
//   authDomain: 'dbproject-68bad.firebaseapp.com',
//   databaseURL: 'https://dbproject-68bad-default-rtdb.firebaseio.com',
//   projectId: 'dbproject-68bad',
//   storageBucket: 'dbproject-68bad.firebasestorage.app',
//   messagingSenderId: '779058037494',
//   appId: '1:779058037494:web:23b2f2bf8d67e6169ee2d7',
//   measurementId: 'G-77W6YEJ7MY',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);

export function initializeFirebase() {

  const serviceAccount = {
    type: env('FIREBASE_TYPE'),
    project_id: env('FIREBASE_PROJECT_ID'),
    private_key_id: env('FIREBASE_PRIVATE_KEY_ID'),
     private_key: env('FIREBASE_PRIVATE_KEY'),
    client_id: env('FIREBASE_CLIENT_ID'),
    GOOGLE_AUTH: env('GOOGLE_AUTH'),
    client_email: env('FIREBASE_CLIENT_EMAIL'),
    auth_uri: env('FIREBASE_auth_uri'),
    token_uri: env('FIREBASE_token_uri'),
    auth_provider_x509_cert_url: env('FIREBASE_auth_provider_x509_cert_url'),
    client_x509_cert_url: env('FIREBASE_client_x509_cert_url'),
    universe_domain: 'googleapis.com',
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dbproject-68bad-default-rtdb.firebaseio.com/',
  });
  return admin.database();
}
