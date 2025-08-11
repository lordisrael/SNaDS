"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const queue_service_1 = require("../../services/queue.service");
const event_model_1 = __importDefault(require("../../models/event.model"));
async function createEvent(req, res) {
    const { user_id, type, method, status, metadata } = req.body;
    const event = new event_model_1.default({ user_id, type, method, status, metadata });
    await event.save();
    await (0, queue_service_1.produceEvent)(event);
    res.status(201).json({ eventId: event._id });
}
module.exports = {
    createEvent
};
//# sourceMappingURL=event.controller.js.map