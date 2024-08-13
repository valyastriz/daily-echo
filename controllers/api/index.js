const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entryRoutes = require('./entryRoutes');
const emailRoutes = require('./emailRoutes');

router.use('/users', userRoutes);
router.use('/entries', entryRoutes);
router.use('/email', emailRoutes);

module.exports = router;