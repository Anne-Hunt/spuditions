import { Schema } from "mongoose";


export const ParkSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true, maxLength: 500 },
        imgUrl: { type: String, required: true, maxLength: 500 },
        webUrl: { type: String, required: true },
        description: { type: String, required: true, minLength: 3, maxLength: 1000 },
        location: { type: String, required: true },
        type: { type: String, enum: ['State Park', 'National Historical Trail', 'National Park', 'National Monument', 'National Geologic Trail', 'National Historic Site', 'National Historic Park', 'National Reserve', 'State Trail'], required: true },
        cost: { type: String },
        regions: { type: String, enum: ['Southeast', 'Southwest', 'North'], required: true },
        daysClosed: { type: String },
        activities: { type: String, enum: [], required: true },
        logo: { type: String, required: true, maxLength: 500 }
    }, { timestamps: true, toJSON: { virtuals: true } }
)