import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    const { title, description, date, type } = req.body;
    try {
        const event = new Event({
            title,
            description,
            date,
            type,
            createdBy: req.user._id,
        });
        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
