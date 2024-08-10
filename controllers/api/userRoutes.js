// will hold Routes for user-related API calls
const express = require('express');
const router = express.Router();
const { User, Entry } = require('../../models');



router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
        
    } catch (error) {
        res.status(500).send(error.message);
        
    }
});


router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); 
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

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

module.exports = router;