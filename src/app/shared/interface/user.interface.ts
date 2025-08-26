export interface UserFormInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  phone: string;
  address: string;
  designName: string;
  department: string;
  joiningDate: string;
  description?: string;
  accsessToken?: string | null;
  refreshToken?: string | null;
  status?: string;      
//   is_admin?: boolean;     
  is_deleted?: boolean;   
  createdAt?: string | null;
  updatedAt?: string | null;
}
