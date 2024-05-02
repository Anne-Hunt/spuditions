import { Schema } from "mongoose";



export const ReputationSchema = new Schema({
    senderId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    receiverId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    amount: { type: Number, required: true, enum: [-1, 1] },
    body: { type: String, required: true, minLength: 1, maxLength: 100 }
}, { timestamps: true })