import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        url: {
            type: String, // URL to the file or resource
            required: true,
        },
        type: {
            type: String, // 'PDF', 'Video', 'Link'
            default: 'Link',
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
