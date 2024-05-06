import mongoose from 'mongoose'
import { accountService } from '../services/AccountService'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
    {
        email: { type: String, required: true, minLength: 1, maxLength: 50, unique: true, validate: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/ },
        name: { type: String, required: true, minLength: 1, maxLength: 20 },
        picture: { type: String, required: true, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', minLength: 1, maxLength: 500 },
        password: { type: String, required: true },
        role: { type: String, enum: ['Banned', 'Member', 'Moderator'], required: true, default: 'Member' },
        ip: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('threadCount', {
    localField: '_id',
    foreignField: 'creatorId',
    ref: 'Thread',
    justOne: false,
    count: true
})


AccountSchema.virtual('postCount', {
    localField: '_id',
    foreignField: 'creatorId',
    ref: 'Post',
    justOne: false,
    count: true
})