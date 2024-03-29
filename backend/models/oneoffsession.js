const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const oneoffsessionSchema = new Schema(
    {
        sessionName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },

        relevantTopics: {
            type: String,
            required: true,
        },
        sessionUrl: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        sessionType: {
            type: String,
            required: true,
        },
        sessionState: {
            type: String,
            enum: ["Pending", "Cancelled"],
            default:"Pending",
            required: false,
         
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OneOffSession", oneoffsessionSchema);
