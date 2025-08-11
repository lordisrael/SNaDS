import { Schema } from 'mongoose';
declare const Log: import("mongoose").Model<{
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    message: string;
    eventId: import("mongoose").Types.ObjectId;
    loggedAt: NativeDate;
    level: "error" | "info" | "warn" | "debug";
    errormessage?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Log;
//# sourceMappingURL=log.model.d.ts.map