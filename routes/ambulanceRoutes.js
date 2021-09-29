const express = require('express');
const router = express.Router();
const {getAll, createAmbulance, getAmbulance, deleteAmbulance, updateAmbulance} = require('../services/ambulanceService');

router.get('/', async(req, res) => {
    const ambulances = await getAll()
    res.json(ambulances)
})
router.post('/', async (req, res) =>{
    const newAmbulance = await createAmbulance(req.body)
    res.send(newAmbulance)
})
//for specific id
router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const ambulance = await getAmbulance(id)
    res.send(ambulance)
})
router.delete('/:id', async (req, res)=>{
    const{id} =req.params;
    const ambulance = await deleteAmbulance(id);
    res.send('ambulance deleted')
})
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const update = await updateAmbulance(id, data);
    res.send(update);
})
module.exports = router;