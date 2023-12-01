import express from "express";
import * as controller from "../controllers/tracking";
import { verify } from "../middleware/auth";

const router = express.Router();

router.get("/", verify, controller.get_tracking);

export default router;
