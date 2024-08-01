export type CustomersResponseType = {
  cid: string;
  name: string;
  short_name: string;
  customer_number: string;
  ele_number: string;
  update_date: string;
  update_member: string;
  registration_member_number: string;
  ele_place_address: string;
  ele_place_name: string;
};

export type CustomerContactDataType = {
  email: string;
  id: string;
  job_description: string;
  name: string;
  note: string;
  phone: string;
  title: string;
  type: string;
};

export type CustomerServiceDataType = {
  id: string;
  notify_date: string;
  title: string;
};

export type CustomerResponseType = {
  cid: string;
  name: string;
  short_name: string;
  customer_number: string;
  ele_number: string;
  acceptance_check_description: string;
  factory_description: string;
  assignment_description?: string;
  tobill_description: string;
  invoice_description: string;
  customer_contacts: CustomerContactDataType[];
  ele_place_name: string;
  ele_place_address: string;
  ele_place_owner: string;
  customer_services: CustomerServiceDataType[];
  registration_member_number?: string;
  ele_engineer?: string;
  taiwan_power_company?: string;
  government?: string;
  test?: string;
  other_description?: string;
  tax_id?: string;
};

export type CustomerRequestDataType = {
  customer_number: string;
  name: string;
  short_name: string;
  ele_number: string;
  tax_id?: string;
};

export type CustomerContactRequestDataType = {
  cid: string;
  name: string;
  type: string;
  phone: string;
  job_description: string;
  title: string;
  note: string;
  email: string;
};

export type UpdateCustomerRequestDataType = {
  cid: string;
  acceptance_check_description: string;
  factory_description: string;
  tobill_description: string;
  invoice_description: string;
  ele_place_name: string;
  ele_place_address: string;
  ele_place_owner: string;
  customer_contacts: string;
  customer_services: string;
  registration_member_number?: string;
  ele_engineer?: string;
  taiwan_power_company?: string;
  government?: string;
  test?: string;
  other_description?: string;
  assignment_description?: string;
};
