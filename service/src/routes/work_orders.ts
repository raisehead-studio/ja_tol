import express from "express";
import * as controllers from "../controllers/work_orders";
import { verify } from "../middleware/auth";

const router = express.Router();

router.put("/lock/:woid", verify, controllers.lock_work_order);
router.put("/unlock/:woid", verify, controllers.unlock_work_order);

router.get("/", verify, controllers.get_work_orders_list);

router.get("/:woid", verify, controllers.get_work_order_detail);

router.put("/", verify, controllers.update_work_order_detail);

router.post("/create_work_order", verify, controllers.create_work_order);

router.get(
  "/get_assignment_detail/:woid",
  verify,
  controllers.get_assignment_detail
);

router.post("/create_assignment", verify, controllers.create_assignment);

router.put("/update_assignment", verify, controllers.update_assignment);

router.post(
  "/create_manpower_schedule",
  verify,
  controllers.create_manpower_schedule
);

router.post("/create_power_stop", verify, controllers.create_power_stop);

router.get(
  "/get_acceptance_check_detail/:woid",
  verify,
  controllers.get_acceptance_check_detail
);

router.post(
  "/create_acceptance_check",
  verify,
  controllers.create_acceptance_check
);

router.put(
  "/update_acceptance_check",
  verify,
  controllers.update_acceptance_check
);

router.get("/get_factory_detail/:woid", verify, controllers.get_factory_detail);

router.put("/update_factory", verify, controllers.update_factory);

router.post("/create_factory", verify, controllers.create_factory);

router.post(
  "/create_factory_other_form",
  verify,
  controllers.create_factory_other_form
);

router.put("/update_tobill", verify, controllers.update_tobill);

router.get("/get_tobill_detail/:woid", verify, controllers.get_tobill_detail);

router.post("/create_tobill", verify, controllers.create_tobill);

router.post(
  "/create_tobill_invoice",
  verify,
  controllers.create_tobill_invoice
);

router.delete("/:woid", verify, controllers.delete__work_order);

export default router;
