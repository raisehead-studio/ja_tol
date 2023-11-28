import express from "express";
import * as controller from "../controllers/customers";
import { verify } from "../middleware/auth";

const router = express.Router();

router.post("/create_customer", controller.create_customer);

router.get("/", verify, controller.get_customers_list);

router.post("/create_ele_place", controller.create_ele_place);

router.get("/:cid", controller.get_customers_detail);

router.put("/update_customers", controller.update_customer_detail);

router.post("/create_customers_contact", controller.create_customer_contact);

// router.post("/create_customers_note", authController.create_user);

export default router;
