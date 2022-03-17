/* eslint-disable no-multiple-empty-lines */
const bcrypt = require('bcrypt');

const users = [
  {
    id: 0,
    email: 'nikolay@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'admin',
    firstName: 'Nikolay',
    lastName: 'Nikolaev',
    gender: 'male',
    birth: '01.02.1990',
    country: 'Belarus',
    accounts: [
      {
        id: 0,
        userId: 0,
        title: 'text',
        description: 'text',
        currency: '$',
        availibleAmount: '1200',
        dateOfCreation: '01.01.2019',
        dateOfUpdate: '02.02.2021',
        transactions: {
          income: [
            {
              id: 0,
              type: 'type',
              accountId: 0,
              title: 'text',
              description: 'text',
              dateOfOperation: '10.11.2020',
              category: 'clothes',
              currency: '$',
              amount: '2000',
              dateOfCreation: '01.01.2019',
              dateOfUpdate: '02.02.2021',
            },
          ],
          expense: [
            {
              id: 0,
              type: 'type',
              accountId: 0,
              title: 'text',
              description: 'text',
              dateOfOperation: '11.12.2020',
              category: 'clothes',
              currency: '$',
              amount: '800',
              dateOfCreation: '01.01.2019',
              dateOfUpdate: '02.02.2021',
            },
          ],
        },
      },
    ],
  },
  {
    id: 1,
    email: 'alexey@gmail.com',
    password: bcrypt.hashSync('11110000', 10),
    role: 'user',
    firstName: 'Alexey',
    lastName: 'Alexeev',
    gender: 'male',
    birth: '02.03.1992',
    country: 'Romania',
    accounts: [
      {
        id: 1,
        userId: 1,
        title: 'text',
        description: 'text',
        currency: '$',
        availibleAmount: '43900',
        dateOfCreation: '01.01.2019',
        dateOfUpdate: '02.02.2021',
        transactions: {
          income: [],
          expense: [],
        },
      },
    ],

  },
  {
    id: 2,
    email: 'mary@gmail.com',
    password: bcrypt.hashSync('02121', 10),
    role: 'admin',
    firstName: 'Mary',
    lastName: 'Swanson',
    gender: 'female',
    birth: '15.05.1995',
    country: 'USA',
    accounts: [
      {
        id: 2,
        userId: 2,
        title: 'text',
        description: 'text',
        currency: '$',
        availibleAmount: '1233900',
        dateOfCreation: '01.01.2019',
        dateOfUpdate: '02.02.2021',
        transactions: {
          income: [],
          expense: [],
        },
      },
    ],

  },

  {
    id: 3,
    email: 'bender@gmail.com',
    password: bcrypt.hashSync('873734841', 10),
    role: 'admin',
    firstName: 'Bender',
    lastName: 'Lenin',
    gender: 'male',
    birth: '31.12.2000',
    country: 'France',
    accounts: [],
    transactions: {
      income: [],
      expense: [],
    },
  },
];



function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

module.exports = {
  getUserByEmail,
  users,
};