import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ParkSchema } from '../models/Park.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Park = mongoose.model('Park', ParkSchema)
}

export const dbContext = new DbContext()
