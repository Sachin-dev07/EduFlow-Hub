import Message from "../models/Message.js";
import User from "../models/User.js";

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }, { isGroup: true }],
        })
            .populate("sender", "name email role")
            .populate("receiver", "name email role")
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
    const { content, receiverId, isGroup, groupName } = req.body;

    try {
        let targetReceiverId = receiverId;

        // If no receiver provided, default to first Admin (Support)
        if (!targetReceiverId && !isGroup) {
            const admin = await User.findOne({ role: 'admin' });
            if (admin) targetReceiverId = admin._id;
        }

        let newMessage = {
            sender: req.user._id,
            content,
            isGroup: isGroup || false,
        };

        if (targetReceiverId) {
            newMessage.receiver = targetReceiverId;
        }

        if (isGroup && groupName) {
            newMessage.groupName = groupName;
        }

        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name email");
        if (message.receiver) {
            message = await message.populate("receiver", "name email");
        }

        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
