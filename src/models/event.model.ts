import { stat } from 'fs';
import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,   
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['login', 'reminder', 'otp', 'signup', 'delete_account'],
    },
    method: {
        type: String,
        required: true,
        enum: ['email', 'sms', 'push'], 
    },
    status: {
        type: String,
        required: true,
        enum: ['success', 'queued', 'failure', 'pending'],
        default: 'pending',
    },
    metadata: { type: Schema.Types.Mixed,
        default: {}  // Flexible structure for additional data
    },
    sent_at: {
        type: Date, 
        default: Date.now,
    },
}, { timestamps: true });

const Event = model("NotificationEvent", eventSchema);

export default Event;
