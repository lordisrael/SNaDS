import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";

import User from "../../models/user.model";
import Preference from "../../models/prefrence.model";
import {StatusCodes} from 'http-status-codes'


export const createUser = AsyncHandler(async (req: Request, res: Response) => {
    let user: any;
    try {
        // Step 1: Create user
        user = await User.create(req.body);

        // Step 2: Try creating preferences
        const preference = await Preference.create({
            user_id: user._id,
            notifications: {
                email_enabled: true,
                sms_enabled: true,
                push_enabled: true,
            },
            privacy: {
                profileVisibility: "public",
                dataSharing: false,
            },
            timezone: "UTC",
        });

        res.status(StatusCodes.OK).json({ user, preference });
    } catch (error:any) {
        // if (error.code === 11000) {
        //     const field = Object.keys(error.keyPattern)[0]; // e.g. "email" or "phone"
        //     res.status(StatusCodes.BAD_REQUEST).json({
        //         success: false,
        //         message: `${field} already exists`,
        //     });
        //     return;
        // }
        // If user was created but preference failed → cleanup
        if (user?._id) {
            await User.deleteOne({ _id: user._id });
        }
        throw error;
    }
})





export const getUserById = AsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    } else {
        res.json(user);
    }
});

export const getAllUsers = AsyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});
