import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: Number,
    },
    role: {
        type: String,
        default: "member",
    }
},
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema)