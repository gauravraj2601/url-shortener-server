const express= require("express")
const cors = require("cors");
const { connection } = require("./db");
const { urlRouter } = require("./routes/url.route");
const PORT=8080
const app= express();
app.use(express.json());
app.use(cors());

app.use("/link", urlRouter)

app.get("/",(req,res)=>{
    res.send({"msg":"This is the HOME "})
})

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is running on PORT ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})