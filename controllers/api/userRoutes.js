// will hold Routes for user-related API calls
const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// route to handle user signup
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.id,
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
        
    } catch (error) {
        res.status(500).send(error.message);
        
    }
});


//create new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// find user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); 
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// update user by id
router.put('/:id', async (req, res) => {
    try {
        const [updatedRows] = await User.update(req.body,{
            where:{id:req.params.id},
        }); 
        if (!updatedRows) return res.status(404).send('User not found');
        res.json({message:'user updated successfully!'});
    } catch (error) {
        res.status(400).send(error.message);
    }
});


//delete user by id
router.delete('/:id', async (req, res) => {
    try {
        // find the user to be deleted
        const user = await User.findByPk(req.params.id); 
        if (!user) return res.status(404).send('User not found');

        // first delete all entries associated with the user
        await Entry.destroy({
            where: { user_id: req.params.id }
        });

        // then, delete the user
        const deletedRows = await User.destroy({
            where:{id:req.params.id},
        }); 

        // send confirmation with details of the deleted user
        res.status(200).json({
            message: 'User successfully deleted',
            deteledUser: user
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {name: req.body.name } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again. '});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user = {
                id: userData.id,
                name: userData.name
            };

            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;