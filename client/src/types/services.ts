export type ServiceResponseDataType = {
  create_member: string;
  customer_number: string;
  id: string;
  notify_date: string;
  short_name: string;
  status: string;
  title: string;
  type: string;
  update_date: string;
  update_member: string;
};

export type ServiceRequestDataType = {
  cid: string;
  title: string;
  status: string;
  type: string;
  notify_date: string;
  update_member: string;
  create_member: string;
  content: string;
};
