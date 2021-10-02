const {callCollection, ambulanceCollection, employeesCollection} = require('../db')
const date = require('date-and-time');
const ObjectId = require('mongodb').ObjectId;

async function getAmbulanceId(){
    try{
        let ambulance = await ambulanceCollection().findOne({available: true});
        let ambulanceId = await ambulance._id;
        if(ambulance !== null){
            return ambulanceId
        } else {
            console.log("No Available Ambulance At The Moment Please For Another Cal To End")
        }
    } catch (e){console.log(e)}
}

async function getAll (){
    return await callCollection().find({}).toArray();
}
async function getCall(id) {
    return await callCollection().findOne({_id: ObjectId(id)})
}
function getTime(){
    const now = new Date();
    const pattern = date.compile('YYYY/MM/DD HH:mm:ss');
    const time = date.format(now, pattern);
    return time
}

async function validateEmployees(callData){
    try{
        let driver = await employeesCollection().findOne({rank: "Driver", available: true});// returns null if not found! if found return object
        let driverId = driver._id
        let paramedic = await employeesCollection().findOne({rank: "Paramedic", available: true});
        let paramedicId = paramedic._id
        let medic = await employeesCollection().findOne({rank: "Medic", available: true});
        let medicId = medic._id
        let ambulance = await ambulanceCollection().findOne({available: true});
        let ambulanceId = ambulance._id

        if(callData.priority === 1){
            if(driver !== null && medic !== null && ambulance !== null){
                await employeesCollection().updateOne({rank: "Driver", available: true, "_id":ObjectId(driverId)},{$set : {available: false}});
                driver = await employeesCollection().findOne({rank: "Driver","_id":ObjectId(driverId)});
                await employeesCollection().updateOne({rank: "Medic", available: true, "_id":ObjectId(medicId)},{$set : {available: false}});
                medic = await employeesCollection().findOne({rank: "Medic", "_id":ObjectId(medicId)});
                await ambulanceCollection().updateOne({available: true, "_id":ObjectId(ambulanceId)},{$set :{available: false, taskForce: [driver,medic]}});
                ambulance = await ambulanceCollection().findOne({available: true, "_id":ObjectId(ambulanceId)})
                return console.log("Call with priority 1 is Ready and Set To Go")
            }
        } else if (callData.priority === 2){
            if(driver !== null && paramedic !== null && ambulance !== null){
                await employeesCollection().updateOne({rank: "Driver", available: true, "_id":ObjectId(driverId)},{$set : {available: false}});
                driver = await employeesCollection().findOne({rank: "Driver","_id":ObjectId(driverId)});
                await employeesCollection().updateOne({rank: "Paramedic", available: true, "_id":ObjectId(paramedicId)},{$set : {available: false}});
                paramedic = await employeesCollection().findOne({rank: "Paramedic", "_id":ObjectId(paramedicId)});
                await ambulanceCollection().updateOne({available: true, "_id":ObjectId(ambulanceId)},{$set :{available: false, taskForce: [driver,paramedic]}});
                ambulance = await ambulanceCollection().findOne({available: true, "_id":ObjectId(ambulanceId)})
                return console.log("Call with priority 2 is Ready and Set To Go")
            }
        } else if(callData.priority === 3){
            if(driver !== null && medic !== null && paramedic !== null && ambulance !== null){
                await employeesCollection().updateOne({rank: "Driver", available: true, "_id":ObjectId(driverId)},{$set : {available: false}});
                driver = await employeesCollection().findOne({rank: "Driver","_id":ObjectId(driverId)});
                await employeesCollection().updateOne({rank: "Medic", available: true, "_id":ObjectId(medicId)},{$set : {available: false}});
                medic = await employeesCollection().findOne({rank: "Medic", "_id":ObjectId(medicId)});
                await employeesCollection().updateOne({rank: "Paramedic", available: true, "_id":ObjectId(paramedicId)},{$set : {available: false}});
                paramedic = await employeesCollection().findOne({rank: "Paramedic", "_id":ObjectId(paramedicId)});
                await ambulanceCollection().updateOne({available: true, "_id":ObjectId(ambulanceId)},{$set :{available: false, taskForce: [driver,paramedic, medic]}});
                ambulance = await ambulanceCollection().findOne({available: true, "_id":ObjectId(ambulanceId)})
                return console.log("Call with priority 3 is Ready and Set To Go")
            }
        } else {
            console.log("Sorry, Not Enough Resources At The Moment, Please Wait...");
        }
    }
    catch(e) {console.log(e)}

    // }
}


async function createCall (newCall){
    const time = getTime();
    const ambulance  = await getAmbulanceId()
    const toAdd = {...newCall, status: 'Open', openDate: time , ambulanceId : ObjectId(ambulance)}; // spread operator
    return await callCollection().insertOne(toAdd);
}
async function closeCall(id){
    const call = await getCall(id)
    const time = getTime();
    const ambulanceId  = call.ambulanceId;
    const ambulance =   await ambulanceCollection().findOne({"_id":ObjectId(ambulanceId)})
    ambulance.taskForce.forEach((employee)=>{
         employeesCollection().updateOne({"_id":ObjectId(employee._id)},{$set: {available : true}})
    })
    await ambulanceCollection().updateOne({"_id":ObjectId(ambulanceId)},{$set : {available : true, taskForce : [] }})
    await callCollection().updateOne({"_id":ObjectId(call._id)},{$set: {status : "Closed", closedDate : time}})
    return console.log("Call Been Closed")
}
async function deleteCall(id) {
        return await callCollection().deleteOne({"_id":ObjectId(id)})
            .then(result => console.log("Call Has Been Deleted"))
            .catch(err => console.error(`Delete failed with error: ${err}`))


}

module.exports = {
    getAll,
    createCall,
    validateEmployees,
    getCall,
    closeCall,
    deleteCall

}
