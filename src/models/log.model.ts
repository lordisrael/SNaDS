import { error } from 'console';
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  eventId: { 
    type: Schema.Types.ObjectId, 
    ref: "Event", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["success", "retry_scheduled", "permanent_failure", "failure"], 
    required: true 
  },
  message: { 
    type: String, 
    default: null 
  },
  error: { 
    type: String, 
    default: null 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true })
const Log = model('Log', logSchema);

export default Log;