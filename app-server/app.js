import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import { config } from 'dotenv';
import { jwtCallback } from './passport.js';
import { adminGuard } from './guards.js';

import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import accountsRouter from './routes/accounts.js';
import incomeRouter from './routes/income.js';
import expenseRouter from './routes/expense.js';
import CategoriesRouter from './routes/categories.js';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);

passport.use(new Strategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });
app.use('/users', auth, usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/accounts', auth, accountsRouter);
app.use('/income', auth, incomeRouter);
app.use('/expense', auth, expenseRouter);
app.use('/categories', auth, CategoriesRouter);

export {
  app,
}