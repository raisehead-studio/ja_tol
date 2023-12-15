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
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db");
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const customers_1 = __importDefault(require("./routes/customers"));
const service_1 = __importDefault(require("./routes/service"));
const work_orders_1 = __importDefault(require("./routes/work_orders"));
const tracking_1 = __importDefault(require("./routes/tracking"));
const customer_1 = __importDefault(require("./models/customer"));
const customer_contact_1 = __importDefault(require("./models/customer_contact"));
const ele_place_1 = __importDefault(require("./models/ele_place"));
const service_2 = __importDefault(require("./models/service"));
const service_content_1 = __importDefault(require("./models/service_content"));
const work_orders_2 = __importDefault(require("./models/work_orders"));
const assignments_1 = __importDefault(require("./models/assignments"));
const manpower_schedule_1 = __importDefault(require("./models/manpower_schedule"));
const power_stop_1 = __importDefault(require("./models/power_stop"));
const acceptance_check_1 = __importDefault(require("./models/acceptance_check"));
const factorys_1 = __importDefault(require("./models/factorys"));
const factory_other_forms_1 = __importDefault(require("./models/factory_other_forms"));
const tobill_1 = __importDefault(require("./models/tobill"));
const tobill_invoce_1 = __importDefault(require("./models/tobill_invoce"));
const user_1 = __importDefault(require("./models/user"));
const permissions_1 = __importDefault(require("./models/permissions"));
const app = (0, express_1.default)();
const port = 5500;
const cors_option = {
    origin: "*",
    optionsSuccessStatus: 204,
};
dotenv.config();
app.use((0, cors_1.default)(cors_option));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use("/api/v1/users", users_1.default);
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/customers", customers_1.default);
app.use("/api/v1/service", service_1.default);
app.use("/api/v1/work_orders", work_orders_1.default);
app.use("/api/v1/tracking", tracking_1.default);
customer_contact_1.default.belongsTo(customer_1.default, { foreignKey: "cid" });
customer_1.default.hasMany(customer_contact_1.default, { foreignKey: "cid" });
ele_place_1.default.belongsTo(customer_1.default, { foreignKey: "cid" });
customer_1.default.hasOne(ele_place_1.default, { foreignKey: "cid" });
service_2.default.belongsTo(customer_1.default, { foreignKey: "cid" });
customer_1.default.hasMany(service_2.default, { foreignKey: "cid" });
service_content_1.default.belongsTo(service_2.default, { foreignKey: "csid" });
service_2.default.hasMany(service_content_1.default, { foreignKey: "csid" });
customer_1.default.hasMany(work_orders_2.default, { foreignKey: "cid" });
work_orders_2.default.belongsTo(customer_1.default, { foreignKey: "cid" });
work_orders_2.default.hasOne(assignments_1.default, { foreignKey: "woid" });
work_orders_2.default.hasOne(acceptance_check_1.default, { foreignKey: "woid" });
work_orders_2.default.hasOne(factorys_1.default, { foreignKey: "woid" });
work_orders_2.default.hasOne(tobill_1.default, { foreignKey: "woid" });
assignments_1.default.belongsTo(work_orders_2.default, { foreignKey: "woid" });
acceptance_check_1.default.belongsTo(work_orders_2.default, { foreignKey: "woid" });
factorys_1.default.belongsTo(work_orders_2.default, { foreignKey: "woid" });
tobill_1.default.belongsTo(work_orders_2.default, { foreignKey: "woid" });
manpower_schedule_1.default.belongsTo(assignments_1.default, { foreignKey: "aid" });
assignments_1.default.hasMany(manpower_schedule_1.default, { foreignKey: "aid" });
power_stop_1.default.belongsTo(assignments_1.default, { foreignKey: "aid" });
assignments_1.default.hasMany(power_stop_1.default, { foreignKey: "aid" });
factory_other_forms_1.default.belongsTo(factorys_1.default, { foreignKey: "fid" });
factorys_1.default.hasMany(factory_other_forms_1.default, { foreignKey: "fid" });
tobill_invoce_1.default.belongsTo(tobill_1.default, { foreignKey: "tbid" });
tobill_1.default.hasMany(tobill_invoce_1.default, { foreignKey: "tbid" });
user_1.default.hasOne(permissions_1.default, { foreignKey: "uid" });
permissions_1.default.belongsTo(user_1.default, { foreignKey: "uid" });
db_1.sequelize
    // .sync({ force: true })
    .sync()
    .then((res) => {
    app.listen(port, () => {
        return console.log(`Express server is listening at http://localhost:${port} 🚀`);
    });
})
    .catch(() => {
    console.log("database connection failed");
});
