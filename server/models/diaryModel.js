const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema(
    {
        meal:
        {
            type: String,
            required: [true, "Please Add Meal"],
            trim: true,
        },

        food:
        {
            type: String,
            required: [true, "Please Add Food"],
            trim: true,
        },

        calories:
        {
            type: Number,
            required: [true, "Please Add Calories"],
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

module.exports = mongoose.model("Diary", diarySchema);