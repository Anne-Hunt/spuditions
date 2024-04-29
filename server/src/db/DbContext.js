import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ParkSchema } from '../models/Park.js';
import { PostSchema } from "../models/Post.js";
import { ReputationSchema } from "../models/Reputation.js";
import { ThreadSchema } from "../models/Thread.js";
import { VisitedSchema } from "../models/Visited.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Park = mongoose.model('Park', ParkSchema)

  Post = mongoose.model('Post', PostSchema)

  Reputation = mongoose.model('Reputation', ReputationSchema)

  Thread = mongoose.model('Thread', ThreadSchema)

  Visited = mongoose.model('Visited', VisitedSchema)
}

export const dbContext = new DbContext()
