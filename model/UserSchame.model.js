import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    varificationToken: {
        type: String,

    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    },
} , { timestamps: true });


const User = mongoose.model("User" , UserSchema);
module.exports = User