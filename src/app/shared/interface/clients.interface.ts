export interface clientsFormInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  phone: string;
  address: string;
  startTime: string;
  endTime: string;
  description?: string;
  status?: string;
  is_deleted?: boolean;   
  createdAt?: string | null;
  updatedAt?: string | null;
    accsessToken?: string | null;
  refreshToken?: string | null;
}
