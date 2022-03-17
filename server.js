require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { jwtCallback } = require('./passport.js');
const { adminGuard } = require('./guards.js');

const usersRouter = require('./routes/users.js');
const loginRouter = require('./routes/login.js');
const accountsRouter = require('./routes/accounts.js');
const incomeRouter = require('./routes/income.js');
const expenseRouter = require('./routes/expense.js');
const expensesCategoriesRouter = require('./routes/expenses.categories.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, jwtCallback));
const auth = passport.authenticate('jwt', { session: false });

app.use('/users', auth, adminGuard, usersRouter);
app.use('/login', loginRouter);
app.use('/accounts', accountsRouter);
app.use('/income', auth, incomeRouter);
app.use('/expense', auth, expenseRouter);
app.use('/expenses/categories', auth, expensesCategoriesRouter);

app.listen(PORT);