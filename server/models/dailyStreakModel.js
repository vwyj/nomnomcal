const mongoose = require('mongoose');

const dailyStreakSchema = new mongoose.Schema(
    {
        dateCheckIn:
        {
            type: String,
            required: true,
            trim: true,
        },
        points:
        {
            type: Number,
            required: true,
            trim: true,
        },
        postedBy:
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },

    }, 
    { timestamps: true }
);

module.exports = mongoose.model("DailyStreak", dailyStreakSchema);