// will hold Routes for user-related API calls
const express = require('express');
const app = express();
const userRoutes = require('./controllers/api/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

router.post('/users', async (req, res) => {
    try {
        const users = await usermodel.findAll();
        res.json(users);
        
    } catch (error) {
        res.status(500).send(error.message);
        
    }
})


router.post('/users', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body); // Replace with true method
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id); // Replace with true method
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.update(req.params.id, req.body); // Replace with true method
        if (!updatedUser) return res.status(404).send('User not found');
        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.delete(req.params.id); // Replace with true method
        if (!deletedUser) return res.status(404).send('User not found');
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error.message);
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
