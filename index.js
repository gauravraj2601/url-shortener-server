const express= require("express")
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { urlRouter } = require("./routes/url.route");
const app= express();
app.use(express.json());
app.use(cors());

app.use("/link", urlRouter)

app.get("/",(req,res)=>{
    res.send({"msg":"This is the HOME "})
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is running on PORT ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})