"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true, lowercase: true, trim: true
    },
    phone: {
        type: String, required: true, unique: true, trim: true
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map