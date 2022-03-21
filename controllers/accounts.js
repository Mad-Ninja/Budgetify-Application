import User from '../models/users.js';

function addAccount(req, res) {
  // users.push(req.body);
  // res.status(200).json({ message: 'Account created' });
}

function editAccount(req, res) {
  // const _id = req.params.id;
  // if (users[_id] == undefined || !users[_id].hasOwnProperty('id')) {
  //   res.status(404).json({ message: 'Id is not exist' });
  // }
  // users[_id] = req.body;
  // res.status(200).json({ message: 'Account edited' });
}

function getAccount(req, res) {
  // const _id = req.params.id;
  // if (users[_id] == undefined || !users[_id].hasOwnProperty('id')) {
  //   res.status(404).json({ message: 'Id is not exist' });
  // }
  // res.json(users[_id]);
}

function deleteAccount(req, res) {
  // const _id = req.params.id;
  // if (users[_id] == undefined || !users[_id].hasOwnProperty('id')) {
  //   res.status(404).json({ message: 'Id is not exist' });
  // }
  // users.splice(_id,1);
  // res.status(200).json({ message: 'Account deleted' });
}

export {
  addAccount,
  editAccount,
  getAccount,
  deleteAccount,
};