import Resource from "../models/Resource.js";

export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createResource = async (req, res) => {
    const { title, description, url, type, courseId } = req.body;
    try {
        const resource = new Resource({
            title,
            description,
            url,
            type,
            courseId,
            uploadedBy: req.user._id,
        });
        const createdResource = await resource.save();
        res.status(201).json(createdResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
