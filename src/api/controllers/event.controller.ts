import { Request, Response } from "express";
import { produceEvent } from "../../services/queue.service";
import Event from "../../models/event.model";
import asyncHandler from "express-async-handler";
import Preference, { } from "../../models/prefrence.model";
import User from "../../models/user.model";
import { setUserPref } from "../../services/cache.service";
import Errors from "../../error";
import {StatusCodes} from 'http-status-codes'

const { NotFoundError, ConflictError } = Errors;

type NotificationMethod = 'email' | 'sms' | 'push';

const typeTemplates: Record<string, (user: any) => Record<string, any>> = {
    signup: (user) => ({
        email: user.email,
        subject: "Welcome to SNADS!",
        message: `Hello ${user.name},\n\nThanks for signing up for SNADS. We're happy to have you on board!`
    }),
    login: (user) => ({
        email: user.email,
        subject: "Login Alert",
        message: `Hello ${user.name},\n\nA login to your account was detected.`
    }),
    otp: (user) => ({
        email: user.email,
        subject: "Your OTP Code",
        message: `Your one-time password is: ${user.otp}`
    }),
    reminder: (user) => ({
    email: user.email,
    subject: "Reminder Notification",
    message: `Hello ${user.name},\n\nThis is your scheduled reminder.`
  }),
    delete_account: (user) => ({
        email: user.email,
        subject: "Account Deletion Confirmation",
        message: `Hello ${user.name},\n\nYour account has been deleted as requested.`
    }),
    
};

/**
 * @desc    Create a new event
 * @route   POST /api/events
 */

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, type, method } = req.body as {
        user_id: string;
        type: string;
        method: NotificationMethod;
    };
    if (!user_id || !type || !method) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
        return;
    }
    if (!Object.keys(typeTemplates).includes(type)) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid event type" });
        return;
    }

    // Check preferences
    const prefs = await Preference.findOne({ user_id });
    if (prefs) {
        // User preferences found
        await setUserPref(user_id, prefs);
        if (prefs.notifications[`${method}_enabled`] === false) {
            res.status(StatusCodes.FORBIDDEN).json({ message: `User has opted out of ${method} notifications.` });
            return;
        }
    }


    const user = await User.findById(user_id);
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
    }

    const metadata = typeTemplates[type] ? typeTemplates[type](user) : {};

    const event = new Event({ user_id, type, method, metadata, status: "queued" });
    await event.save();
    await produceEvent(event.toObject());
    res.status(StatusCodes.CREATED).json({ eventId: event._id });
});

/**
 * @desc    Get event by ID
 * @route   GET /api/events/:id
 */

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Event not found" });
        return;
    }
    res.status(StatusCodes.OK).json(event);
});

/**
 * @desc    Get all events
 * @route   GET /api/events
 */

export const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    const events = await Event.find();
    res.status(StatusCodes.OK).json(events);
});
