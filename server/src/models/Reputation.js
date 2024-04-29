import { Schema } from "mongoose";



export const ReputationSchema = new Schema({
    senderId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    receiverId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    amount: { type: Number, required: true, enum: [-1, 1] }
}, { timestamps: true })