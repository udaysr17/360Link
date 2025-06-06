import express from "express"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT
const server = app.listen(
    PORT ,()=>{
        console.log(`Server is listening on port ${PORT}`)
    }
);  