const  mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    Location: {
        type: String,
    }
}, { timestamps: true }
);

module.exports = mongoose.model("ToDo", ToDoSchema);
