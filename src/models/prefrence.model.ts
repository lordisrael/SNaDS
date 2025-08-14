import { Schema, model, Document, Types} from 'mongoose';

export interface IPreference extends Document {
    user_id: Types.ObjectId;
    notifications: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        dataSharing: boolean;
    };
    timezone: string;
}

const preferenceSchema = new Schema<IPreference>({
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

const Preference = model<IPreference>("UserPreference", preferenceSchema);

export default Preference;
