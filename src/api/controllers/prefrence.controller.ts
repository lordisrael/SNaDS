import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Preference from "../../models/prefrence.model";
import { setUserPref } from "../../services/cache.service";
import User from "../../models/user.model";
import {StatusCodes} from 'http-status-codes'

export const updatePreference = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { notifications, privacy, timezone } = req.body;
        const { user_id } = req.params;
        const userExists = await User.findById(user_id);
        if (!userExists) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }
        const preference = await Preference.findOneAndUpdate(
            { user_id },
            { notifications, privacy, timezone },
            { new: true, upsert: true }
        );
        // await setUserPref(user_id, preference);
        res.status(StatusCodes.OK).json(preference);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
});


export const getPreference = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const preference = await Preference.findOne({ user_id });
        if (!preference) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Preference not found" });
            return;
        }
        res.status(StatusCodes.OK).json(preference);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
});