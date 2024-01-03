//store payment in database 
const mongoose = require('mongoose'); 
//store set, price,postedby(username) in database  
const diymealkitSchema = new mongoose.Schema( 
    { 
        diymealkit: //setA-D  
        { 
            type: String, 
            required: [true, "Please Select a Set"], 
            trim: true, 
        }, 
        price: //price 
        { 
            type: String, 
            required: [true, "Please input price"], 
            trim: true, 
        }, 
        //username  
        postedBy: 
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User', 
            required: true, 
        }, 
 
    },  
    { timestamps: true } 
); 
 
module.exports = mongoose.model("Diymealkit", diymealkitSchema);
