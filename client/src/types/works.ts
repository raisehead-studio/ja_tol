export type WorkResponseDataType = {
  customer_name: string;
  customer_number: string;
  id: string;
  invoice_number: string;
  order_number: string;
  update_date: string;
  work_order_name: string;
  update_member?: string;
  status?: string;
  notify_date?: string;
};

export type WorkRequestDataType = {
  cid: string;
  name: string;
  invoice_number?: string;
  order_number: string;
  type: string;
  amount: string;
  inquiry_member: string;
  responsible_member: string;
  po: string;
  acceptance_check_date: string;
  tobill_date: string;
  factory_date: string;
  assignment_date: string;
};
