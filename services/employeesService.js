const { employeesCollection} = require('../db')
const ObjectId = require('mongodb').ObjectId;


async function getAll (){
    return await employeesCollection().find({}).toArray();
}

async function createEmployee (newEmployee) {
    const toAdd = {...newEmployee, available: true}; // spread operator
    return await employeesCollection().insertOne(toAdd)
}
async function getEmployee(id){
    console.log(id)
    return await employeesCollection().findOne({"_id":ObjectId(id)});
}
async function deleteEmployee(id){
    return await employeesCollection().deleteOne({"_id":ObjectId(id)});
}
async function updateEmployee(id, data){
    try{
        let filter= {"_id":ObjectId(id)};
        let updateEmp = {
            $set: data
        }
        console.log(id, data)
        return await employeesCollection().updateOne(filter, updateEmp);
    }
    catch (e){console.log(e)}

}
module.exports = {
    getAll,
    createEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee
}