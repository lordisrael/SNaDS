import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";

import User from "../../models/user.model";

export const createUser = AsyncHandler(async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
})


export const getUserById = AsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
    } else {
        res.json(user);
    }
});

export const getAllUsers = AsyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});
