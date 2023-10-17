import express from "express";
import * as controllers from "../controllers/work_orders";

const router = express.Router();

router.get("/", controllers.get_work_orders_list);

router.post("/create_work_order", controllers.create_work_order);

router.get("/get_assignment_detail/:woid", controllers.get_assignment_detail);

router.post("/create_assignment", controllers.create_assignment);

router.post("/create_manpower_schedule", controllers.create_manpower_schedule);

router.post("/create_power_stop", controllers.create_power_stop);

router.get(
  "/get_acceptance_check_detail/:woid",
  controllers.get_acceptance_check_detail
);

router.post("/create_acceptance_check", controllers.create_acceptance_check);

router.get("/get_factory_detail/:woid", controllers.get_work_orders_list);

router.post("/create_factory", controllers.create_factory);

router.post(
  "/create_factory_other_form",
  controllers.create_factory_other_form
);

router.get("/get_tobill_detail/:woid", controllers.get_work_orders_list);

router.post("/create_tobill", controllers.create_tobill);

router.post("/create_tobill_invoice", controllers.create_tobill_invoice);

export default router;
