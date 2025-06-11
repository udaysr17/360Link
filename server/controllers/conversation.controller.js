import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const createGroupChat = expressAsyncHandler(async(req, res) => {
    const { conversationName, participants } = req.body;
    const user = req.user._id;

    if (!participants.includes(user)) {
        participants.push(user);
    }

    const existingGroup = await Conversation.findOne({
        isGroup: true,
        participants: { $all: participants, $size: participants.length }
    });
    
    if (existingGroup) {
        return res.status(400).json({ message: "Group with these participants already exists" });
    }
    
    const newConversation = new Conversation({
        conversationName,
        participants,
        isGroup: true,
        groupAdmin: user
    });

    const savedConversation = await newConversation.save();
    
    return res.status(201).json({
        message: "Group created successfully",
        data: savedConversation
    });
});

const createPersonalChat = expressAsyncHandler(async(req, res) => {
    const {userId , otherUserId} = req.body;

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
        return res.status(404).json({ message: "User not found" });
    }
    
    const existingConversation = await Conversation.findOne({
        isGroup: false,
        participants: { $all: [userId, otherUserId]}
    });
    
    if (existingConversation) {
        await existingConversation
        .populate('participants', '-password')
        .populate('latestMessage')
        .populate('latestMessage.sender', '-password');

        return res.status(400).json({ 
            message: "Conversation already exists",
            data: existingConversation 
        });
    }
    
    const newConversation = new Conversation({
        isGroup: false,
        participants: [userId, otherUserId],
        conversationName: otherUser.username
    });

    const savedConversation = await newConversation.save();
  
    return res.status(201).json({
        message: "Personal Chat created",
        data: savedConversation
    });
});

const getConversation = expressAsyncHandler(async(req, res)=> {
    const userId = req.user._id;
    const conversations = await Conversation.find({participants : userId})
    .populate('latestMessage')
    .populate('latestMessage.sender', '-password');

    return res.status(200).json({
        message : "Conversations fetched",
        conversations
    })
})

const getParticipants = expressAsyncHandler(async(req,res)=>{
    const conversationId = req.params.id;
    const participants = await Conversation.findById(conversationId).select('participants', '-password');
    return res.status(200).json({
        message : "Participants got successfully",
        participants
    })
})

const updateConversation = expressAsyncHandler(async(req, res) => {
    const { conversationId, operation, data } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
    }

    // Ensure it's a group conversation
    if (!conversation.isGroup) {
        return res.status(400).json({ message: "Personal chats cannot be modified" });
    }

    // Verify user is admin
    if (conversation.groupAdmin.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Only group admin can perform updates" });
    }

    let update = {};
    switch (operation) {
        case "update_name":
            if (!data || typeof data !== "string") {
                return res.status(400).json({ message: "Invalid conversation name" });
            }
            update.conversationName = data;
            break;
        
        case "add_participant":
            const userToAdd = await User.findById(data);
            if (!userToAdd) {
                return res.status(404).json({ message: "User not found" });
            }
            if (conversation.participants.includes(data)) {
                return res.status(400).json({ message: "User already in conversation" });
            }
            update.$addToSet = { participants: data };
            break;
        
        case "remove_participant":
            if (!conversation.participants.includes(data)) {
                return res.status(400).json({ message: "User not in conversation" });
            }
            if (conversation.groupAdmin.toString() === data) {
                return res.status(400).json({ message: "Cannot remove group admin" });
            }
            update.$pull = { participants: data };
            break;
        
        default:
            return res.status(400).json({ message: "Invalid operation" });
    }

    const updatedConversation = await Conversation.findByIdAndUpdate(
        conversationId,
        update,
        { new: true, runValidators: true }
    ).populate('participants', '-password');

    return res.status(200).json({
        message: "Conversation updated successfully",
        data: updatedConversation
    });
});

const deleteConversation = expressAsyncHandler(async(req, res) => {
    const  conversationId  = req.params.conversationId;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
    }

    // Verify user is in conversation
    if (!conversation.participants.includes(userId)) {
        return res.status(403).json({ message: "User not in conversation" });
    }

    // Handle group conversation
    if (conversation.isGroup) {
        // Remove user from participants
        conversation.participants = conversation.participants.filter(
            participant => participant.toString() !== userId.toString()
        );

        // Handle admin leaving
        if (conversation.groupAdmin.toString() === userId.toString()) {
            // Assign new admin if participants exist
            if (conversation.participants.length > 0) {
                conversation.groupAdmin = conversation.participants[0];
            } 
            // Delete empty conversation
            else {
                await Conversation.findByIdAndDelete(conversationId);
                return res.status(200).json({ message: "Conversation deleted" });
            }
        }

        // Delete if less than 2 participants remain
        if (conversation.participants.length < 2) {
            await Conversation.findByIdAndDelete(conversationId);
            return res.status(200).json({ message: "Conversation deleted" });
        }

        await conversation.save();
        return res.status(200).json({ 
            message: "Left conversation successfully",
            data: conversation
        });
    } 
    // Handle personal conversation
    else {
        // Delete personal conversation
        await Conversation.findByIdAndDelete(conversationId);
        return res.status(200).json({ message: "Conversation deleted" });
    }
});

export {
    createGroupChat,
    createPersonalChat,
    getConversation,
    getParticipants,
    updateConversation,
    deleteConversation
}