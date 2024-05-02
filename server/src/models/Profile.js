import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProfileSchema = new Schema(
    {
        name: { type: String, required: true, minLength: 1, maxLength: 20 },
        picture: { type: String, required: true, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', minLength: 1, maxLength: 500 },
        role: { type: String, enum: ['Banned', 'Member', 'Moderator'], required: true, default: 'Member' },
        ip: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)