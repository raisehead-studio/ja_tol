import express from "express";
import * as controller from "../controllers/auth";

const router = express.Router();

router.post("/login", controller.login);

export default router;
