const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const login = require('./login');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/login', login);
// router.use('/oauth', oauthRedirect);

module.exports = router;
