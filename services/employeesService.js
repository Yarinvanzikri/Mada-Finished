const {ambulanceCollection} = require('../db')
const ObjectId = require('mongodb').ObjectId;


async function getAll (){
    return await ambulanceCollection().find({}).toArray();
}

async function createEmployee (newEmployee) {
    const toAdd = {...newEmployee, available: true}; // spread operator
    return await ambulanceCollection().insertOne(toAdd)
}
async function getEmployee(id){
    console.log(id)
    return await ambulanceCollection().findOne({"_id":ObjectId(id)});
}
async function deleteEmployee(id){
    return await ambulanceCollection().deleteOne({"_id":ObjectId(id)});
}
async function updateEmployee(id, data){
    try{
        let filter= {"_id":ObjectId(id)};
        let updateEmp = {
            $set: data
        }
        console.log(id, data)
        return await ambulanceCollection().updateOne(filter, updateEmp);
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