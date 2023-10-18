export type CustomersResponseType = {
  cid: string;
  name: string;
  short_name: string;
  customer_number: string;
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
  customer_contacts: any[];
  ele_place_name: string;
  ele_place_address: string;
  ele_place_owner: string;
  customer_services: any[];
};

export type CustomerRequestDataType = {
  customer_number: string;
  name: string;
  short_name: string;
  ele_number: string;
};
