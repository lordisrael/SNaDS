import { Schema } from 'mongoose';
declare const Event: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
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
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user_id: import("mongoose").Types.ObjectId;
    type: "login" | "logout" | "reminder" | "otp" | "signup" | "update_profile" | "delete_account";
    method: "push" | "email" | "sms";
    status: "success" | "queued" | "failure" | "pending";
    metadata: any;
    sent_at: NativeDate;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Event;
//# sourceMappingURL=event.model.d.ts.map