"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers = __importStar(require("../controllers/work_orders"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", auth_1.verify, controllers.get_work_orders_list);
router.get("/:woid", auth_1.verify, controllers.get_work_order_detail);
router.put("/", auth_1.verify, controllers.update_work_order_detail);
router.post("/create_work_order", auth_1.verify, controllers.create_work_order);
router.get("/get_assignment_detail/:woid", auth_1.verify, controllers.get_assignment_detail);
router.post("/create_assignment", auth_1.verify, controllers.create_assignment);
router.put("/update_assignment", auth_1.verify, controllers.update_assignment);
router.post("/create_manpower_schedule", auth_1.verify, controllers.create_manpower_schedule);
router.post("/create_power_stop", auth_1.verify, controllers.create_power_stop);
router.get("/get_acceptance_check_detail/:woid", auth_1.verify, controllers.get_acceptance_check_detail);
router.post("/create_acceptance_check", auth_1.verify, controllers.create_acceptance_check);
router.put("/update_acceptance_check", auth_1.verify, controllers.update_acceptance_check);
router.get("/get_factory_detail/:woid", auth_1.verify, controllers.get_factory_detail);
router.put("/update_factory", auth_1.verify, controllers.update_factory);
router.post("/create_factory", auth_1.verify, controllers.create_factory);
router.post("/create_factory_other_form", auth_1.verify, controllers.create_factory_other_form);
router.put("/update_tobill", auth_1.verify, controllers.update_tobill);
router.get("/get_tobill_detail/:woid", auth_1.verify, controllers.get_tobill_detail);
router.post("/create_tobill", auth_1.verify, controllers.create_tobill);
router.post("/create_tobill_invoice", auth_1.verify, controllers.create_tobill_invoice);
router.delete("/:woid", auth_1.verify, controllers.delete__work_order);
exports.default = router;
