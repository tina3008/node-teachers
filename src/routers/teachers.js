import { Router } from 'express';
import express from 'express';
// import {
//   getContactIDController,
//   getContactsController,
//   createContactController,
//   deleteContactController,
//   changeContactController,
// } from '../controllers/contacts.js';
 import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  getTeacherByIdController,
  getTeachersController,
} from '../controllers/teachers.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import {
//   schemaContactPost,
//   schemaContactPatch,
// } from '../validation/contacts.js';
// import { isValidID } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';
// import { upload } from '../middlewares/multer.js';

const router = Router();
// import { initializeFirebase } from '../db/firebaseConfig.js';
//   const db = initializeFirebase();

// const jsonParser = express.json();

// router.use(authenticate);



  // Пример маршрута для получения данных из Firebase
  router.get('/', getTeachersController);

   router.get('/:teacherId', getTeacherByIdController);

    //  Пример маршрута для добавления данных в Firebase
  router.get('/add', (req, res) => {
    const ref = db.ref('users');
    ref.push(
      {
        username: 'user1',
        email: 'user1@example.com',
      },
      (error) => {
        if (error) {
          res.status(500).send('Ошибка при добавлении данных');
        } else {
          res.send('Данные успешно добавлены');
        }
      },
    );
  });



// router.get('/', ctrlWrapper(getContactsController));

// router.get(
//   '/:contactId',

//   checkRoles(ROLES.AUTOR),
//   isValidID,
//   ctrlWrapper(getContactIDController),
// );

// router.post(
//   '/',
//   upload.single('photo'),
//   validateBody(schemaContactPost),
//   ctrlWrapper(createContactController),
// );


export default router;
