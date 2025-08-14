import { Router } from "express";

import * as EventController from "../controllers/event.controller";

const router = Router();

router.post("/", EventController.createEvent);
router.get("/:id", EventController.getEventById);
router.get("/", EventController.getAllEvents);

export default router;
