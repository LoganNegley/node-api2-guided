const express = require('express');
const database = require('./database.js');

const server = express();
//get users
server.get('/api/users', (req, res) =>{
    const users = database.getUsers()
    

    if(users){
        res.json(users);
    } else{
        res.status(500).json({
            errorMessage:'The users information could not be retrieved'
        })
    }
});
//get user by id
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
