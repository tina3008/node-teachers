import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { firebaseConfig } from '../db/firebaseConfig.js';

// Инициализация Firebase (только один раз)
initializeApp(firebaseConfig);
// const users = getAuth();
// const db = getDatabase();

// Функция регистрации пользователя
export const regUser = async (req, res) => {
  const { email, password, name } = req.body;
  const auth = getAuth();

  try {
    // Создание пользователя
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Установка имени пользователя в Firebase Authentication
    await updateProfile(user, { displayName: name });

    // Сохранение дополнительной информации в Realtime Database
    const db = getDatabase();
    await set(ref(db, 'users/' + user.uid), {
      name: name,
      email: email,
    });

    res
      .status(201)
      .send('User registered, profile updated, and data added to database.');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();

  try {
    // Попытка входа пользователя
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    res.status(200).send({
      message: 'User logged in successfully',
      user: {
        name: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user: ' + error.message);
  }
};

export const logoutUser = async (req, res) => {
  const auth = getAuth();

  try {
    await signOut(auth);
    res.status(200).send('User logged out successfully.');
  } catch (error) {
    res.status(500).send('Error logging out: ' + error.message);
  }
};

export const addTeacherToUser = async (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // Проверяем, что пользователь авторизован
  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  const { teacherId } = req.body;  // Получаем ID учителя из запроса
  const db = getDatabase();

  try {
    // Получаем данные учителя из узла "teachers"
    const teacherRef = child(ref(db), `teachers/${teacherId}`);
    const teacherSnapshot = await get(teacherRef);

    if (!teacherSnapshot.exists()) {
      return res.status(404).send('Teacher not found');
    }

    // Получаем данные учителя
    const teacherData = teacherSnapshot.val();

    // Добавляем учителя в узел "users/{uid}/myTeachers"
    const userTeacherRef = ref(db, `users/${user.uid}/myTeachers/${teacherId}`);
    await set(userTeacherRef, teacherData);

    res.status(200).send('Teacher added to user list successfully');
  } catch (error) {
    res.status(500).send('Error adding teacher: ' + error.message);
  }
};
