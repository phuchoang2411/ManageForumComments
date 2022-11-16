import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@phuctickets/common';

// import { currentUserRouter } from './routes/current-user';
// import { signinUserRouter } from './routes/signin';
import { signuptUserRouter } from './routes/signup';
// import { signoutUserRouter } from './routes/signout';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// app.use(currentUserRouter);
// app.use(signinUserRouter);
app.use(signuptUserRouter);
// app.use(signoutUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
