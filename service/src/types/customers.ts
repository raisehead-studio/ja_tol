import { type } from "os";

export type CustomerContactDataType = {
  ccid: string;
  type:
    | "work_execution"
    | "work_dispatch"
    | "site_admission"
    | "acceptance_check"
    | "to_bill"
    | "others";
  name: string;
  title: string;
  phone: string;
  job_description: string;
  email: string;
  note?: string;
};

export type CustomerDataType = {
  cid: string;
  short_name: string;
  customer_number: string;
  name: string;
  ele_number: string;
  acceptance_check_description?: string;
  factory_description?: string;
  assignment_description?: string;
  tobill_description?: string;
  invoice_description?: string;
  contacts: CustomerContactDataType[];
  notes: [];
};
