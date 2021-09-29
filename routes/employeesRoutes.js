const express = require('express');
const router = express.Router();
const {getAll, createEmployee, getEmployee, deleteEmployee, updateEmployee} = require('../services/employeesService');

router.get('/', async(req, res) => {
    const employees = await getAll()
    res.json(employees)
})
router.post('/', async (req, res) =>{
    const newEmployee = await createEmployee(req.body)
    res.send(newEmployee)
})
//for specific id
router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const employee = await getEmployee(id)
    res.send(employee)
})
router.delete('/:id', async (req, res)=>{
    const{id} =req.params;
    const employee = await deleteEmployee(id);
    res.send('employee deleted')
})
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const update = await updateEmployee(id, data);
    res.send(update);
})
module.exports = router;