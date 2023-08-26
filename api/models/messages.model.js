import mongoose from 'mongoose';
const { Schema } = mongoose;

const messagesSchema = new Schema({
    userOne: {
        type: String,
        required: true,
        unique: false,
    },
    userTwo: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
},
{
    timestamps: true
});

export default mongoose.model("messages", messagesSchema)