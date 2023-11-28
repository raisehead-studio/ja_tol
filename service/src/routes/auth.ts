import express from "express";
import * as controller from "../controllers/auth";

const router = express.Router();

router.post("/login", controller.login);

router.post("/token", controller.token);

router.get("/status", controller.status);

export default router;
