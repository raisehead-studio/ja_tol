import express from "express";
import * as controller from "../controllers/users";

const router = express.Router();

router.get("/", controller.get_users);

router.get("/:uid", controller.get_user);

router.post("/", controller.create_user);

router.put("/", controller.update_user);

export default router;
