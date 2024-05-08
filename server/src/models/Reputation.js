import { Schema } from "mongoose";



export const ReputationSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    profileId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    rating: { type: Number, required: true, enum: [-1, 1] },
    comment: { type: String, required: true, minLength: 1, maxLength: 100 }
}, { timestamps: true })