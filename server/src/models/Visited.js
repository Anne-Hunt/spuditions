import { Schema } from "mongoose";


export const VisitedSchema = new Schema({
	creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
	parkId: { type: Schema.ObjectId, required: true, ref: 'Park' },
	body: { type: String, maxLength: 500 },
	userRating: { type: Number, max: 5, min: 1, required: true, default: 5 },
}, { timestamps: true, toJSON: { virtuals: true } }
)

VisitedSchema.virtual('park', {
	localField: 'creatorId',
	ref: 'Account',
	foreignField: '_id',
	justOne: true
})

VisitedSchema.virtual('park', {
	localField: 'parkId',
	ref: 'Park',
	foreignField: '_id',
	justOne: true
})