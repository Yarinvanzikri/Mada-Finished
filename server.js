const express = require('express')
const {connect} = require('./db')
const routes = require('./routes');
const app = express();
app.use(express.json())
app.use(routes);



app.listen(8080,()=>{
    connect()
    console.log("listening to mada server on port 8080")
})

/*
employee {
rank: 'medic' or 'paramedic' or 'driver',
name: string,
available: boolean
}

call {
priority: 1(medic&driver) or 2(paramedic&driver&medic) or 3(paramedic&driver&medic),
createdAt: date,
ambulanceId: objectId
}

ambulance {
taskForce: Array (employees),
available: boolean
}
*/