import { Router } from "express";

import * as UserController from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getAllUsers);

export default router;
