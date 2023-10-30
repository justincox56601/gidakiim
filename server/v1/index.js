const {Router} = require('express');
const weatherRoute = require('./weather');

const router = Router();

router.use('/weather', weatherRoute)

module.exports = router