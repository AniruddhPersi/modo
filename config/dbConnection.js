const mongoose = require("mongoose")

const connectDb = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true
    })
    .then((data) => {
        console.log(`MongoDb is connected with server: ${data.connection.host}`);
    })
    .catch((err)=> {
        console.log("err",err);
    })
}

module.exports = connectDb