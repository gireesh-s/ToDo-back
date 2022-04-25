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
        type: Date,
    },
    time: {
        type: String,
    },
    location: {
        type: String,
    },
    userId: {
        type: String,
    }
}, { timestamps: true }
);

module.exports = mongoose.model("ToDo", ToDoSchema);
