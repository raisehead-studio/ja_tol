import express from "express";
import * as controller from "../controllers/service";
import { verify } from "../middleware/auth";

const router = express.Router();

router.post("/create_service", verify, controller.create_service);

router.get("/", verify, controller.get_service_list);

router.get("/:csid", verify, controller.get_service_detail);

router.put("/update_service", verify, controller.update_service);

router.post(
  "/create_service_content",
  verify,
  controller.create_service_content
);

router.delete("/:csid", verify, controller.delete_service);

export default router;
