import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import expressAsyncHandler from "express-async-handler";
import { updateConversation } from "./conversation.controller.js";

// create , read , update , delete
const createMessage = expressAsyncHandler(async(req, res)=> {
    console.log('this is create message route');
    const {content} = req.body;
    const sender = req.user._id;
    const conversation = req.params.conversationId;

    if(content.trim().length ==0){
        return res.status(400).json({
            message : "Message is empty"
        })
    }

    const newMessage = await Message.create({
        content,
        sender,
        conversation
    })

    await Conversation.findByIdAndUpdate(conversation,  {
        latestMessage : newMessage._id
    })

    return res.status(200).json({
        message : "Message created successfully"
    })
})

const getMessage = expressAsyncHandler(async(req, res)=> {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({conversation : conversationId})
    .sort({createdAt : 1})
    .populate("sender" , "-password")

    return res.status(200).json({
        message : "Messages fetched successfully",
        data : messages
    })
})

const editMessage = expressAsyncHandler(async(req, res)=>{
    // logic to edit a message
    const {conversation, message, content} = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(message._id, {
        content : content,
        updatedAt : Date.now()
    })

    if(conversation.latestMessage._id == message._id){
        const updatedConversation = await Conversation.findByIdAndUpdate(conversation._id, {
            latestMessage : updatedMessage
        })
    }

    return res.status(200).json({
        message : "Updated message",
        updatedMessage,
        updateConversation
    })
})

const deleteMessage = expressAsyncHandler(async(req, res)=> {
    const {conversation, message} = req.body;
    await Message.findByIdAndDelete(message._id);
    // update the latest message of the conversation ,, how ??????
    if(conversation.latestMessage._id == message._id){
        const updateConversation = await Conversation.findByIdAndDelete(conversation.latestMessage);
    }
    return res.status(200).json({
        message : "Deleted Message"
    })
})

export {
    createMessage,
    getMessage,
    editMessage,
    deleteMessage
}