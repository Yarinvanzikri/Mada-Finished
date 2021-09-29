const {ambulanceCollection} = require('../db')
const ObjectId = require('mongodb').ObjectId;


async function getAll (){
    return await ambulanceCollection().find({}).toArray();
}

async function createAmbulance (newAmbulance) {
    const toAdd = {...newAmbulance, available: true}; // spread operator
    return await ambulanceCollection().insertOne(toAdd)
}
async function getAmbulance(id){
    console.log(id)
    return await ambulanceCollection().findOne({"_id":ObjectId(id)});
}
async function deleteAmbulance(id){
    return await ambulanceCollection().deleteOne({"_id":ObjectId(id)});
}
async function updateAmbulance(id, data){
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
    createAmbulance,
    getAmbulance,
    deleteAmbulance,
    updateAmbulance
}