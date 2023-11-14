const {Router} = require('express');
const weatherRoute = require('./routes/weather');

const router = Router();

router.use('/weather', weatherRoute)

module.exports = router