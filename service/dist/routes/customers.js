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
const controller = __importStar(require("../controllers/customers"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create_customer", auth_1.verify, controller.create_customer);
router.get("/", auth_1.verify, controller.get_customers_list);
router.post("/create_ele_place", auth_1.verify, controller.create_ele_place);
router.get("/:cid", auth_1.verify, controller.get_customers_detail);
router.put("/update_customers", auth_1.verify, controller.update_customer_detail);
router.post("/create_customers_contact", auth_1.verify, controller.create_customer_contact);
router.delete("/:cid", auth_1.verify, controller.delete_customer);
// router.post("/create_customers_note", authController.create_user);
exports.default = router;
