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

export type AssignmentResponseDataType = {
  id: string;
  manufacturing_address: string;
  manufacturing_status: string;
  manufacturing_date: string;
  power_stop_contact: string;
  power_stop_phone1: string;
  power_stop_phone2: string;
  power_stop_date: string;
  external_contact_is_holiday: boolean;
  external_contact_is_power_stop: boolean;
  external_contact_request_date: string;
  external_contact_receive_date: string;
  tracking_date: string;
  tracking_description: string;
  tracking_is_finished: boolean;
  tracking_finished_date: string;
  work_order_name: string;
  work_order_type: string;
  po: string;
  acceptance_check_date: string;
  tobill_date: string;
  factory_date: string;
  assignment_date: string;
  customer_number: string;
  customer_name: string;
  manpower_schedule: {
    id: string;
    note: string;
    schedule_date: string;
    started_time: string;
    finished_time: string;
    actual_date: string;
  }[];
  power_stop: {
    id: string;
    area: string;
    started_time: string;
    finished_time: string;
  }[];
};
