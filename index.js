const express = require('express');
const database = require('./database.js');

const server = express();

server.get('/api/users', (req, res) =>{
    const users = database.getUsers()
    res.json(users);
});

server.get('/api/users/:id', (req, res) =>{
    const userId = req.params.id
    const user = database.getUserById(userId)

    if(user){
        res.json(user)
    }else{
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
});

server.listen(4000, () => {
console.log('listening on port 4000')
});
