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
import transactionsRouter from './routes/transactions.js';
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

mongoose.connect(`${process.env.MONGODB_URI}`);

passport.use(new Strategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

app.get('/', (req, res) => {
  res.end('<h1>BUDGETIFY APP</h1>')
});

app.use('/users', auth, usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/accounts', auth, accountsRouter);
app.use('/transactions', auth, transactionsRouter);
app.use('/categories', auth, CategoriesRouter);

export {
  app,
}