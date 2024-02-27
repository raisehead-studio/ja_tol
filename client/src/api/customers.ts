import request from "./requests";

import {
  CustomerRequestDataType,
  CustomerContactRequestDataType,
  UpdateCustomerRequestDataType,
} from "../types/customers";

export const getCustomers = async (orderBy: string, orderType: string) => {
  return request(
    `/api/v1/customers?orderBy=${orderBy}&orderType=${orderType}`
  ).then((res) => res.data);
};

export const getCustomer = async (id: string) => {
  return request(`/api/v1/customers/${id}`).then((res) => res.data);
};

export const createCustomer = async (data: CustomerRequestDataType) => {
  return request("/api/v1/customers/create_customer", {
    method: "POST",
    body: data,
  }).then((res) => res);
};

export const updateCustomer = async (data: UpdateCustomerRequestDataType) => {
  return request("/api/v1/customers/update_customers", {
    method: "PUT",
    body: data,
  });
};

export const createCustomerContact = async (
  data: CustomerContactRequestDataType
) => {
  return request("/api/v1/customers/create_customers_contact", {
    method: "POST",
    body: data,
  });
};

export const deleteCustomer = async (id: string) => {
  return request(`/api/v1/customers/${id}`, {
    method: "DELETE",
  });
};
