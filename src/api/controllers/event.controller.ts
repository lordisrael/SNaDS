import { Request, Response } from "express";
import { produceEvent } from "../../services/queue.service";
import Event from "../../models/event.model";

export async function createEvent(req: Request, res: Response) {
    const { user_id, type, method, status, metadata } = req.body;
    const event = new Event({ user_id, type, method, status, metadata });
    await event.save();
    await produceEvent(event);
    res.status(201).json({ eventId: event._id });
}


module.exports = {
    createEvent
};