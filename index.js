const express = require('express');
const database = require('./database.js');


const server = express();
server.use(express.json());

// POST route to api users
server.post('/api/users', (req, res) =>{
    if( !req.body.bio || !req.body.bio){
        return
        res.status(404).json({
            errorMessage: 'Please provide name and bio for the user'
            })
    }

    const newUser = database.createUsesr({
        name: req.body.name,
        bio: req.body.bio
    });

    if(!newUser){
        res.status(500).json({
            errorMessage:'There was an error while saving the user to the database'
        })
    }else{
        res.status(201).json(newUser)
    };
});

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

// Update users
    server.put('/api/users/:id', (req, res) => {
const user = database.getUserById(req.params.id)

    if(user){
         const updatedUser = database.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })

        res.status(200).json(updatedUser)
    } else{
        res.status(404).json({
            message:'The user with the specified ID does not exist'
        })
    }

});

// Delete request
server.delete('/api/users/:id', (req, res) => {
    const user = database.getUserById(req.params.id)
    
    if(user){
         database.deleteUser(user.id)
         res.status(204).end()
    } else{
        res.status(404).json({
            errorMessage: 'The user with the specified Id does not exist'
        })
    }


})

server.listen(4000, () => {
console.log('listening on port 4000')
});
