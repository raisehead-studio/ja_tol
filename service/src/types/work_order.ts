export type Type = "ele_examination" | "i" | "none_examination";

export type WorkOrderRequestDataType = {
  cid: string;
  name: string;
  invoice_number: string;
  order_number: string;
  type: string;
  amount: number;
  inquiry_member: string;
  responsible_member: string;
  po: string;
  acceptance_check_date?: string;
  tobill_date?: string;
  factory_date?: string;
  assignment_date?: string;
};

export type WorkOrderResponseDataType = {
  id: string;
  work_order_name: string;
  invoice_number: string;
  order_number: string;
  customer_name: string;
  customer_number: string;
};
