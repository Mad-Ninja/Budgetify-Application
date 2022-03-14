const {users} = require ('../database/users.js');

function addUser (req, res) {
    users.push(req.body);    
    res.status(200).json({message: "User created"});
}

function editUser(req, res){
    const _id = req.params.id;
    if(users[_id] == undefined || !users[_id].hasOwnProperty('id')){
        res.status(404).json({ message: 'Id is not exist' });
    }
    users[_id] = req.body;
    res.status(200).json({message: "User edited"});
}

function getUser (req, res){
    const _id = req.params.id;
    if(users[_id] == undefined || !users[_id].hasOwnProperty('id')){
        res.status(404).json({ message: 'Id is not exist' });
    }
    res.json(users[_id]);
}

function deleteUser(req, res){
    const _id = req.params.id;
    if(users[_id] == undefined || !users[_id].hasOwnProperty('id')){
        res.status(404).json({ message: 'Id is not exist' });
    }
    users.splice(_id,1);
    res.status(200).json({message: "User deleted"});
}


module.exports = {
    addUser,
    editUser,
    getUser,
    deleteUser,
  };
