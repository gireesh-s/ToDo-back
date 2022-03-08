const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const ToDoRoutes = require("./routes/toDo")

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI
).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json());
app.use("/api", ToDoRoutes)

const PORT = process.env.PORT || 5000
app.listen( PORT, () => {
    console.log(`Server Running on the Port ${PORT}`)
})
