export type WorkResponseDataType = {
  id: string;
  customer_number: string;
  customer_name: string;
  notify_date: Date;
  order_number: string;
  work_order_name: string;
  manufacturing_date: Date | string;
  manpower_schedule_started_time: Date | string | null;
  manpower_schedule_actual_date: Date | string | null;
  receive_date: Date | string | null;
  tai_power_notify_date: Date | string | null;
  is_assign_manpower: boolean;
  factory_tracking_date: Date | string | null;
  report_status: string;
  photo_download: string;
  acceptance_check_tracking_date: Date | string | null;
  tobill_tracking_date: Date | string | null;
  update_member: string;
  update_date: Date | string | null;
  tobill_finished_date: Date | string | null;
  test: string | null;
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
  finished_date: string;
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
  finished_date: Date;
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
  finished_date: Date | undefined;
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
  customer?: {
    cid?: string;
    customer_number?: string;
    short_name?: string;
  };
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
  update_date?: Date;
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
  photo_download?: string;
  photo_download_date?: Date;
  warranty_number?: string;
  warranty_started_date?: Date;
  warranty_end_date?: Date;
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
  amount: string | number;
  sent_date: Date | number;
  note: string;
  numbers_invoices: string | number;
  numbers_reports: string | number;
  numbers_general_forms: string | number;
  numbers_inqualify_agreements: string | number;
  numbers_envelope: string | number;
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
