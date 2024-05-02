import { Schema } from "mongoose";



export const VisitedSchema = new Schema({
    parkId: { type: Schema.ObjectId, required: true, ref: 'Park' },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    userRating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    body: { type: String, default: "No comment provided.", maxLength: 500 }
}, { timestamps: true })