const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoConnedted:');
})()

app.get('/', (req, res) => {
    console.log(req.header("Authorization").split(" ")[1])
    res.json({message: 'ok'})
})

app.listen(port, () => {
    console.log("ServerRunnde On", port);
})