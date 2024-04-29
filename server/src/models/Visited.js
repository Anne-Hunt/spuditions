import { Schema } from "mongoose";



export const VisitedSchema = new Schema({
  parkId: { type: Schema.ObjectId, required: true, ref: 'Park' },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  userRating: { type: Number, required: true, enum: [] }
}, { timestamps: true, toJSON: { virtuals: true } })