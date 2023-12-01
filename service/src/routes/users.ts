import express from "express";
import * as controller from "../controllers/users";
import { verify } from "../middleware/auth";

const router = express.Router();

router.get("/", verify, controller.get_users);

router.get("/:uid", verify, controller.get_user);

router.post("/", verify, controller.create_user);

router.put("/", verify, controller.update_user);

router.delete("/:uid", verify, controller.delete_user);

export default router;
