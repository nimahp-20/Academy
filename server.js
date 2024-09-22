const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT;

    (async () => {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoConnedted:');
    })()

app.listen(port,()=>{
    console.log("ServerRunnde On",port);
})