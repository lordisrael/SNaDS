import { Schema, model} from 'mongoose';

const preferenceSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
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

const Preference = model("UserPreference", preferenceSchema);

export default Preference;
