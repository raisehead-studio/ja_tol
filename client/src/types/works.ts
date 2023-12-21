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
  manufacturing_date?: Date;
  is_inspection_report_retrieved_date?: Date;
  started_time?: Date;
  item_data?: string;
  is_assign_manpower: boolean;
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
  acceptance_check_date: string | Date | number;
  tobill_date: string | Date | number;
  factory_date: string | Date | number;
  assignment_date: string | Date | number;
};

export type WorkDetailRequestDataType = {
  woid?: string;
  type: string;
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
  is_assign_manpower: boolean;
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
  manpower_schedule: AssignmentPowerScheduleDataType[];
  power_stop: AssignmentPowerStopDataType[];
  is_adjusted: boolean;
};

export type AssignmentPowerScheduleDataType = {
  id?: string;
  note: string;
  schedule_date?: string | Date | number;
  started_time: string | Date | number;
  finished_time: string | Date | number;
  actual_date: string | Date | number;
  aid?: string;
};

export type AssignmentPowerStopDataType = {
  id?: string;
  aid?: string;
  area: string;
  started_date?: string | Date | number;
  finished_date?: string | Date | number;
  other_description?: string;
  stop_shift?: string;
  request_date?: string | Date | number;
  receive_date?: string | Date | number;
  engineer?: string;
  customer?: string;
  tai_power_area?: string;
  tai_power_notify_date?: string | Date | number;
  is_holiday?: string;
};

export type AssignmentDataType = {
  woid: string;
  manufacturing_address: string;
  manufacturing_status: string;
  manufacturing_date: Date;
  power_stop_contact?: string;
  power_stop_phone1?: string;
  power_stop_phone2?: string;
  power_stop_date?: string;
  external_contact_is_holiday: boolean;
  external_contact_is_power_stop: boolean;
  is_assign_manpower: boolean;
  external_contact_request_date: Date;
  external_contact_receive_date: Date;
  tracking_date: Date;
  tracking_description: string;
  tracking_is_finished: boolean;
  tracking_finished_date: Date;
  work_order_name?: string;
  work_order_type?: string;
  po?: string;
  acceptance_check_date?: string;
  tobill_date?: string;
  factory_date?: string;
  assignment_date?: string;
  customer_number?: string;
  customer_name?: string;
  manpower_schedule: AssignmentPowerScheduleDataType[] | string;
  power_stop: AssignmentPowerStopDataType[] | string;
};

export type AssignmentRequestDataType = {
  woid: string;
  manufacturing_address: string | undefined;
  manufacturing_status: string | undefined;
  manufacturing_date: Date | undefined;
  // power_stop_contact: string;
  // power_stop_phone1: string;
  // power_stop_phone2: string;
  // power_stop_date: string;
  external_contact_is_holiday: boolean;
  external_contact_is_power_stop: boolean;
  is_assign_manpower: boolean;
  external_contact_request_date: Date | undefined;
  external_contact_receive_date: Date | undefined;
  tracking_date: Date | undefined;
  tracking_description: string | undefined;
  tracking_is_finished: boolean;
  tracking_finished_date: Date | undefined;
  // work_order_name: string;
  // work_order_type: string;
  // po: string;
  // acceptance_check_date: string;
  // tobill_date: string;
  // factory_date: string;
  // assignment_date: string;
  // customer_number: string;
  // customer_name: string;
  manpower_schedule: AssignmentPowerScheduleDataType[] | string;
  power_stop: AssignmentPowerStopDataType[] | string;
};

export type WorkOrderDetailResponseDataType = {
  cid: string;
  woid: string;
  name: string;
  invoice_number: string;
  order_number: string;
  type: string;
  amount: number;
  inquiry_member: string;
  responsible_member: string;
  po: string;
  acceptance_check_date: string;
  tobill_date: string;
  factory_date: string;
  assignment_date: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  assign_finished_date: Date | null;
  acceptance_check_finished_date: Date | null;
  to_bill_finished_date: Date | null;
  factory_finished_date: Date | null;
  ele_name: string;
  ele_address: string;
};

export type FactoryDataType = {
  id: string;
  description: string;
  tracking_date: Date;
  tracking_description: string;
  tracking_is_finished: boolean;
  finished_date: Date;
  factory_other_form: FactoryOtherFormType[];
  is_class: boolean;
  is_bunny_shoe: boolean;
  is_bunny_suit: boolean;
  is_group_insurance: boolean;
  is_label_insurance: boolean;
};

export type FactoryRequestDataType = {
  woid: string;
  description: string | undefined;
  tracking_date: Date | undefined;
  tracking_description: string | undefined;
  tracking_is_finished: boolean | undefined;
  finished_date: Date | undefined;
  factory_other_form: string;
};

export type FactoryOtherFormType = {
  id?: string;
  fid?: string;
  is_class: boolean;
  is_bunny_shoe: boolean;
  is_bunny_suit: boolean;
  is_group_insurance: boolean;
  is_label_insurance: boolean;
  other_form: string;
};

export type AcceptanceCheckDataType = {
  id: string;
  description: string;
  is_photo_before: boolean;
  is_photo_during: boolean;
  is_photo_after: boolean;
  power_switch_date1: Date;
  power_switch_date2: Date;
  power_switch_date3: Date;
  power_switch_date4: Date;
  defect_agreement: string;
  report_type: string;
  ew06_registration: string;
  fom17_registration_government_date: Date;
  fom17_registration_ele_date: Date;
  is_warranty: boolean;
  tracking_date: Date;
  tracking_description: string;
  tracking_is_finished: boolean;
  finished_date: Date;
  wt_report_number?: string;
  is_inspection_report_retrieved?: boolean;
  is_inspection_report_retrieved_date?: Date;
};

export type AcceptanceCheckRequestDataType = {
  woid: string;
  description: string | undefined;
  is_photo_before: boolean | undefined;
  is_photo_during: boolean | undefined;
  is_photo_after: boolean | undefined;
  power_switch_date1: Date | undefined;
  power_switch_date2: Date | undefined;
  power_switch_date3: Date | undefined;
  power_switch_date4: Date | undefined;
  defect_agreement: string | undefined;
  report_type: string | undefined;
  ew06_registration: string | undefined;
  fom17_registration_government_date: Date | undefined;
  fom17_registration_ele_date: Date | undefined;
  is_warranty: boolean | undefined;
  tracking_date: Date | undefined;
  tracking_description: string | undefined;
  tracking_is_finished: boolean | undefined;
  finished_date: Date | undefined;
  wt_report_number: string | undefined;
};

export type TobillDataType = {
  id: string;
  description: string;
  tracking_date: Date;
  tracking_description: string;
  tracking_is_finished: boolean;
  finished_date: Date;
  tobill_invoice: TobillInvoiceDataType[];
};

export type TobillInvoiceDataType = {
  tbid?: string;
  id?: string;
  percentage: string;
  date: Date | number;
  amount: number;
  sent_date: Date | number;
  note: string;
  numbers_invoices: number;
  numbers_reports: number;
  numbers_general_forms: number;
  numbers_inqualify_agreements: number;
  numbers_envelope: number;
  invoice_number: string;
};

export type TobillRequestDataType = {
  woid: string | undefined;
  description: string | undefined;
  tracking_date: Date | undefined;
  tracking_description: string | undefined;
  tracking_is_finished: boolean | undefined;
  finished_date: Date | undefined;
  tobill_invoice: string;
};
