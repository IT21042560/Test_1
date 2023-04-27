import express from 'express'
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path"
import { fileURLToPath } from "url"

const filePath = fileURLToPath(import.meta.url);
const dirName = path.dirname(filePath);


const app = express();
const PORT = process.env.PORT || 8041
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(dirName, "uploadImages")));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.listen(PORT, () =>{
    console.log("********************************************")
    console.log(`Server Running on port : ${PORT}`)
})


const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection success!")
    console.log("********************************************")
})

import admin from './routes/AdminRoutes.js'
app.use("/Admin",admin);