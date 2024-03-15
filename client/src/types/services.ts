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
  create_date: string | Date;
};

export type ServiceRequestDataType = {
  cid: string;
  title: string;
  status: string;
  type: string;
  notify_date: number | "";

  content: string;
};

export type ServiceDetailResponseDataType = {
  short_name?: string;
  customer_number?: string;
  title: string;
  status: string;
  type: string;
  notify_date: Date;
  update_member: string;
  create_member: string;
  create_date?: Date;
  customer_service_contents: {
    id?: string;
    content: string;
    create_date?: Date;
  }[];
};
