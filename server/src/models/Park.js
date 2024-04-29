import { Schema } from "mongoose";


export const ParkSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        imgUrl: { type: String, required: true },
        webUrl: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, enum: ['State Park', 'National Historical Trail', 'National Park', 'National Monument', 'National Geologic Trail', 'National '] }
    }
)