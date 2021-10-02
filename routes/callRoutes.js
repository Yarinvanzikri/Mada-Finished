const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const {getAll, createCall, validateEmployees, getCall, closeCall, deleteCall}= require('../services/callService');

router.get('/', async(req, res) => {
    const calls = await getAll();
    res.json(calls)
})
router.post('/', async(req, res)=>{
    const newCall = await createCall(req.body);
    validateEmployees(req.body)
    res.send(newCall)
})
router.get('/:_id', async (req, res)=>{
    _id = req.params._id;
    const call = await getCall(_id);
    res.json(call);
})
router.put ('/:_id', async(req, res)=>{
    _id = req.params._id;
    const call = await closeCall(_id);
    res.send(call);
})
router.delete ('/:_id', async (req, res) => {
    _id = req.params._id;
    res.send(await deleteCall(_id))

})


module.exports = router;