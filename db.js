const { MongoClient } = require("mongodb");
const url ="mongodb://localhost:27017"; // the url of the Mongodb Database.
const mada = new MongoClient(url);
let employees;
let call;
let ambulance;

async function connect(){
    await mada.connect();
    console.log("server connected to mada with mongo db")

    const madaDb = mada.db('mada');
     employees = madaDb.collection('employees');
     call = madaDb.collection('call');
     ambulance = madaDb.collection('ambulance');

}
function employeesCollection(){
    return employees;
}
function callCollection(){
    return call;
}
function ambulanceCollection(){
    return ambulance;
}


module.exports = {
    connect,
    ambulanceCollection: employeesCollection,
    callCollection,
    ambulanceCollection

}