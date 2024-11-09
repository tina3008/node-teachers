import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs/promises';

export function initializeFirebase() {

  const serviceAccount = path.join(process.cwd(), 'serviceAccountKey.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dbproject-68bad-default-rtdb.firebaseio.com/',
  });
  return admin.database();
}


