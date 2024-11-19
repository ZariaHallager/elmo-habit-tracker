const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    days: { type: [Boolean], default: [false, false, false, false, false, false, false] },
    isPinned: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Habit', habitSchema);
