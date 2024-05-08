import { Schema } from "mongoose";

export const ThreadSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    section: { type: String, required: true, enum: ["general chat", "equipment", "park", "find group", "Ashton to Tetonia Trail", "Bear Lake", "Bruneau Dunes", "Castle Rocks", "City of Rocks", "Coeur d’Alene Parkway", "Coeur d’Alene’s Old Mission", "Dworshak", "Eagle Island", "Farragut", "Harriman", "Hells Gate", "Henrys Lake", "Heyburn", "Lake Wolcott", "Land of the Yankee Fork", "Lucky Peak", "Massacre Rocks", "McCroskey", "Ponderosa", "Priest Lake", "Round Lake", "Thousand Springs", "Three Island Crossing", "Trail of the Coeur d’Alenes", "Winchester Lake", "Yellowstone", "Craters of the Moon", "Oregon Trail", "California Trail", "Lewis & Clark Trail", "Nez Perce", "Ice Age Floods", "Hagerman Fossil Beds", "Minidoka"], default: "general chat" },
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

ThreadSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})