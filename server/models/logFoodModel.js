const mongoose = require('mongoose');

const logFoodSchema = new mongoose.Schema(
    {
        mealB:
        {
            type: String,
            required: [false, "Please Add Meal"],
            trim: true,
        },

        breakfast:
        {
            type: String,
            required: [false, "Please Add Food"],
            trim: true,
        },

        caloriesBreakfast:
        {
            type: Number,
            required: [false, "Please Add Calories"],
            trim: true,
        },

        mealL:
        {
            type: String,
            required: [false, "Please Add Meal"],
            trim: true,
        },

        lunch:
        {
            type: String,
            required: [false, "Please Add Food"],
            trim: true,
        },

        caloriesLunch:
        {
            type: Number,
            required: [false, "Please Add Calories"],
            trim: true,
        },

        mealD:
        {
            type: String,
            required: [false, "Please Add Meal"],
            trim: true,
        },

        dinner:
        {
            type: String,
            required: [false, "Please Add Food"],
            trim: true,
        },

        caloriesDinner:
        {
            type: Number,
            required: [false, "Please Add Calories"],
            trim: true,
        },

        dateToDb:
        {
            type: String,
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

module.exports = mongoose.model("LogFood", logFoodSchema);