// import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
// import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
// import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
// import {database} from './db/firebase.js';

const bootstrap = async () => {
  // await initMongoConnection();
//    await database();
//   await createDirIfNotExists(TEMP_UPLOAD_DIR);
//   await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
