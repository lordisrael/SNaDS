import { error } from 'console';
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'NotificationEvent',
        required: true
    },
    loggedAt: {
        type: Date,
        default: Date.now
    },
    level: {
        type: String,
        required: true,
        enum: ['info', 'warn', 'error', 'debug'],
        default: 'info'
    },
    message: {
        type: String,
        required: true
    },
    errormessage: {
        type: String,
    }
});

const Log = model('Log', logSchema);

export default Log;