import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";

dotenv.config();

export const sequelize = new Sequelize(process.env.CONNECTION_STRING as string);
