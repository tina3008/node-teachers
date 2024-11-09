import createHttpError from 'http-errors';

import { initializeFirebase } from '../db/firebaseConfig.js';
const db = initializeFirebase();

export const getTeachersController = (req, res) => {
  const ref = db.ref('teachers');
  ref.once(
    'value',
    (snapshot) => {
      res.send(snapshot.val());
    },
    (errorObject) => {
      res.status(500).send('Ошибка при получении данных');
    },
  );
};

export const getTeacherByIdController = (req, res) => {
  const { teacherId } = req.params; // Извлекаем teacherId из параметров запроса

  const ref = db.ref(`teachers/${teacherId}`); // Указываем путь к конкретному учителю
  ref.once(
    'value',
    (snapshot) => {
      const teacher = snapshot.val();
      if (!teacher) {
        return res.status(404).send(`Учитель с ID ${teacherId} не найден`);
      }
      res.send(teacher);
    },
    (errorObject) => {
      res.status(500).send('Ошибка при получении данных');
    },
  );
};

//  if (!teacher) {
//     throw createHttpError(404, `Contact not found, ${teacherId}`);
//   }
