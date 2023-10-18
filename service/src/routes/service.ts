import express from "express";
import * as controller from "../controllers/service";

const router = express.Router();

router.post("/create_service", controller.create_service);

router.get("/", controller.get_service_list);

router.get("/:csid", controller.get_service_detail);

router.put("/update_service", controller.update_service);

router.post("/create_service_content", controller.create_service_content);

export default router;
