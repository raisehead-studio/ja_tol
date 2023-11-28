import express from "express";
import * as controller from "../controllers/tracking";

const router = express.Router();

router.get("/", controller.get_tracking);

export default router;
