const router = require('express').Router();

const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');
const signUpRoutes = require('./api/signUp');

// router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', signUpRoutes);

module.exports = router;
