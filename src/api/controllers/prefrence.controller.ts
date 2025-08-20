import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Preference from "../../models/prefrence.model";
import { setUserPref } from "../../services/cache.service";
import User from "../../models/user.model";

export const updatePreference = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { notifications, privacy, timezone } = req.body;
        const { user_id } = req.params;
        const userExists = await User.findById(user_id);
        if (!userExists) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const preference = await Preference.findOneAndUpdate(
            { user_id },
            { notifications, privacy, timezone },
            { new: true, upsert: true }
        );
        // await setUserPref(user_id, preference);
        res.status(200).json(preference);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


export const getPreference = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const preference = await Preference.findOne({ user_id });
        if (!preference) {
            res.status(404).json({ message: "Preference not found" });
            return;
        }
        res.status(200).json(preference);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});