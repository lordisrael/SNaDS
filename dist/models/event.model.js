"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['login', 'logout', 'reminder', 'otp', 'signup', 'update_profile', 'delete_account'],
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
    metadata: { type: mongoose_1.Schema.Types.Mixed,
        default: {} // Flexible structure for additional data
    },
    sent_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Event = (0, mongoose_1.model)("NotificationEvent", eventSchema);
exports.default = Event;
//# sourceMappingURL=event.model.js.map