import { Schema } from "mongoose";

export const ThreadSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    section: { type: String, required: true, enum: ["default"], default: "default" },
    title: { type: String, required: true, maxLength: 30 },
    body: { type: String, required: true, minLength: 1, maxLength: 1000 },
    tags: { type: [String] }
}, { timestamps: true, toJSON: { virtuals: true } })

ThreadSchema.virtual('posts', {
    localField: '_id',
    foreignField: 'threadId',
    ref: 'Post',
    justOne: false
})