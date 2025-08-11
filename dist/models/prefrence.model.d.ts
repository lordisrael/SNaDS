import { Schema } from 'mongoose';
declare const Preference: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    timezone: string;
    notifications?: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    } | null | undefined;
    privacy?: {
        profileVisibility: "public" | "private" | "friends";
        dataSharing: boolean;
    } | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Preference;
//# sourceMappingURL=prefrence.model.d.ts.map