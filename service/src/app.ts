import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";

import { sequelize as seq } from "./utils/db";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import customerRouter from "./routes/customers";
import serviceRouter from "./routes/service";
import WorkOrderRouter from "./routes/work_orders";
import Customer from "./models/customer";
import CustomerContact from "./models/customer_contact";
import ElePlace from "./models/ele_place";
import CustomerService from "./models/service";
import CustomerServiceContent from "./models/service_content";
import WorkOrder from "./models/work_orders";
import Assignments from "./models/assignments";
import ManpowerSchedule from "./models/manpower_schedule";
import PowerStop from "./models/power_stop";
import AcceptanceCheck from "./models/acceptance_check";
import Factorys from "./models/factorys";
import FactoryOtherForm from "./models/factory_other_forms";
import ToBill from "./models/tobill";
import ToBillInvoice from "./models/tobill_invoce";
import User from "./models/user";
import Permissions from "./models/permissions";

const app = express();
const port = 5500;
const cors_option = {
  origin: "*",
  optionsSuccessStatus: 204,
};
dotenv.config();

app.use(cors(cors_option));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/work_orders", WorkOrderRouter);

CustomerContact.belongsTo(Customer, { foreignKey: "cid" });
Customer.hasMany(CustomerContact, { foreignKey: "cid" });
ElePlace.belongsTo(Customer, { foreignKey: "cid" });
Customer.hasOne(ElePlace, { foreignKey: "cid" });
CustomerService.belongsTo(Customer, { foreignKey: "cid" });
Customer.hasMany(CustomerService, { foreignKey: "cid" });
CustomerServiceContent.belongsTo(CustomerService, { foreignKey: "csid" });
CustomerService.hasMany(CustomerServiceContent, { foreignKey: "csid" });
Customer.hasMany(WorkOrder, { foreignKey: "cid" });
WorkOrder.belongsTo(Customer, { foreignKey: "cid" });
WorkOrder.hasOne(Assignments, { foreignKey: "woid" });
WorkOrder.hasOne(AcceptanceCheck, { foreignKey: "woid" });
WorkOrder.hasOne(Factorys, { foreignKey: "woid" });
WorkOrder.hasOne(ToBill, { foreignKey: "woid" });
Assignments.belongsTo(WorkOrder, { foreignKey: "woid" });
AcceptanceCheck.belongsTo(WorkOrder, { foreignKey: "woid" });
Factorys.belongsTo(WorkOrder, { foreignKey: "woid" });
ToBill.belongsTo(WorkOrder, { foreignKey: "woid" });
ManpowerSchedule.belongsTo(Assignments, { foreignKey: "aid" });
Assignments.hasMany(ManpowerSchedule, { foreignKey: "aid" });
PowerStop.belongsTo(Assignments, { foreignKey: "aid" });
Assignments.hasMany(PowerStop, { foreignKey: "aid" });
FactoryOtherForm.belongsTo(Factorys, { foreignKey: "fid" });
Factorys.hasMany(FactoryOtherForm, { foreignKey: "fid" });
ToBillInvoice.belongsTo(ToBill, { foreignKey: "tbid" });
ToBill.hasMany(ToBillInvoice, { foreignKey: "tbid" });
User.hasOne(Permissions, { foreignKey: "uid" });
Permissions.belongsTo(User, { foreignKey: "uid" });

seq
  // .sync({ force: true })
  .sync()
  .then((res) => {
    app.listen(port, () => {
      return console.log(
        `Express server is listening at http://localhost:${port} 🚀`
      );
    });
  })
  .catch(() => {
    console.log("database connection failed");
  });
