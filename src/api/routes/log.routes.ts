import { Router } from "express";

import * as logController from "../controllers/log.controller";

const router = Router();

router.get("/", logController.getLogs);
router.get("/event/:eventId", logController.getLogsByEvent);
router.get("/:id", logController.getLogById);

export default router;