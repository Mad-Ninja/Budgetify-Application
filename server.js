const express = require('express');
const usersRouter = require('./routes/users.js');
const incomeRouter = require('./routes/income.js');
const expenseRouter = require('./routes/expense.js');
const expensesCategoriesRouter = require('./routes/expenses.categories.js');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use('/income', incomeRouter);

app.use('/expense', expenseRouter);

app.use('/expenses/categories', expensesCategoriesRouter);




app.listen(3000);