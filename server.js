const express = require("express");
const app = express();
const http = require("http");
const dbConnection = require("./config/dbConnection")
const bodyParser = require("body-parser")
require('dotenv').config();
const cors = require("cors")
const port = process.env.PORT;

dbConnection()


const httpServer = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require("./routes/taskListRoute")(app)
// app.get("/",(req,res)=>{
//     res.send("welcome to modo")
// });

httpServer.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})


