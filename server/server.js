import express from "express"
import 'dotenv/config'
import userRoutes from "./routes/user.route.js"
import messageRoutes from './routes/message.route.js'
import conversationRoutes from './routes/conversation.route.js'
import connectDB from "./utils/db.js"
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT
await connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.post('/', ()=>{
    console.log('post hello');
})
app.get('/', ()=>{
    console.log('get hello');
})
app.use('/api/user', userRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/message', messageRoutes);
console.log('Hello')
app.listen(
    PORT ,async()=>{
        console.log(`Server is listening on port ${PORT}`)
    }
);  