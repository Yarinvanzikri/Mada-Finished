const express = require('express');
const router = express.Router();
const couponService = require('../services/callService');

router.get('/', (req, res) => {
    res.send("get all calls")
})

module.exports = router;