import { CustomerStatus } from './../enums/customer-status';

export interface Customer {
  email?: string;
  name?: string;
  surname?: string;
  status?: CustomerStatus;
}
