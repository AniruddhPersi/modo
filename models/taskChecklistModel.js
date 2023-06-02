const mongoose = require("mongoose")

const taskCheckListSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true,
        },
        buttonElement: {
            type: Object
        },
        is_completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("taskList",taskCheckListSchema);