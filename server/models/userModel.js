const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Please Add Name"],
            trim: true,
        },

        email:
        {
            type: String,
            required: [true, "Please Add Email"],
            unique: true,
            trim: true,
        },

        password:
        {
            type: String,
            required: [true, "Please Add Password"],
            min: 6,
            max: 64,
        },

        dob:
        {
            type: String,
            required: [true, "Please Add Date of birth"],
            trim: true,
        },

        gender:
        {
            type: String,
            required: [true, "Please Add Gender"],
            trim: true,
        },

        height:
        {
            type: Number,
            required: [true, "Please Add Height"],
            trim: true,
        },
        weight:
        {
            type: Number,
            required: [true, "Please Add Weight"],
            trim: true,
        },

        activitylvl:
        {
            type: String,
            required: [true, "Please Add Activity Level"],
            trim: true,
        },

        allergyString:
        {
            type: String,
            required: [false, "Please Add Allergy"],
            trim: true,
        },

        question:
        {
            type: String,
            required: [true, "Please Add Question"],
            trim: true,
        },

        answer:
        {
            type: String,
            required: [true, "Please Add Answer"],
            trim: true,
        },
        
        goal:
        {
            type: String,
            required: [true, "Please Add Goal"],
            trim: true,
        },

        totalCalories:
        {
            type: Number,
            required: [true, "Please Add Total Calories"],
            trim: true,
        },

        lastLogin:
        {
            type: Date,
            required: false,
            trim: true,
        },


        role:
        {
            type: String,
            enum: ['user', 'admin', 'po', 'bo'],
            
        },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);