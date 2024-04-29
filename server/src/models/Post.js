import { Schema } from "mongoose";



export const PostSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  threadId: { type: Schema.ObjectId, required: true, ref: 'Thread' },
  body: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})