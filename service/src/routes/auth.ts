import express from "express";
import * as authController from "../controllers/auth";

const router = express.Router();

router.post("/create_user", authController.create_user);

export default router;
