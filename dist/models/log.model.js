"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logSchema = new mongoose_1.Schema({
    eventId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const Log = (0, mongoose_1.model)('Log', logSchema);
exports.default = Log;
//# sourceMappingURL=log.model.js.map