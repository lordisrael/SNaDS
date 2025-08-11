"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const preferenceSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notifications: {
        email_enabled: {
            type: Boolean,
            default: true
        },
        sms_enabled: {
            type: Boolean,
            default: true
        },
        push_enabled: {
            type: Boolean,
            default: true
        }
    },
    privacy: {
        profileVisibility: {
            type: String,
            enum: ['public', 'private', 'friends'],
            default: 'public'
        },
        dataSharing: {
            type: Boolean,
            default: false
        }
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
}, { timestamps: true });
const Preference = (0, mongoose_1.model)("UserPreference", preferenceSchema);
exports.default = Preference;
//# sourceMappingURL=prefrence.model.js.map