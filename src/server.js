import { env } from './utils/env.js';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import router from './routers/index.js';
import cookieParser from 'cookie-parser';
// import { UPLOAD_DIR } from './constants/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

// import { swaggerDocs } from './middlewares/swaggerDocs.js';
// import teachersRouter from './routers/teachers.js';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  //  app.use('/api-docs', swaggerDocs());
  // routers
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
