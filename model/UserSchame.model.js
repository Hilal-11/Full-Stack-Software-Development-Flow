import mongoose from "mongoose"
import bcrypt, { genSalt } from "bcryptjs";
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

// Hooks
UserSchema.pre("save" , async function (next) {
    if(this.isModified("password")) {
        const salt_round = await genSalt(10)
        this.password = await bcrypt.hash(this.password , salt_round)
    }
    next();
})


const User = mongoose.model("User" , UserSchema);
export { User }