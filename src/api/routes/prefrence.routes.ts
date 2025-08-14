import { Router } from "express";

import * as prefrenceController from "../controllers/prefrence.controller";

const router = Router();

router.post("/", prefrenceController.setPreference);
router.get("/:user_id", prefrenceController.getPreference);

export default router;