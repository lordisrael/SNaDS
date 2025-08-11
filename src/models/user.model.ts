import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: { 
        type: String, required: true, unique: true, lowercase: true, trim: true
    },
    phone: { 
        type: String, required: true, unique: true, trim: true
    },
}, { timestamps: true })

const User = model("User", userSchema);

export default User;