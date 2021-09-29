const express = require('express');
const router = express.Router();

router.use('/employees', require('./routes/employeesRoutes'));
router.use('/calls', require('./routes/callRoutes'));
router.use('/ambulances', require('./routes/ambulanceRoutes'));

module.exports = router;
