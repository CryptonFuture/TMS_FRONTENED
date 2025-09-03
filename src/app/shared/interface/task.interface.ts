export interface TaskFormInterface {
  _id?: string;
   name:string;
   description?: string;
  accsessToken?: string | null;
  refreshToken?: string | null;
  status?: string;      
  is_deleted?: boolean;   
  createdAt?: string | null;
  updatedAt?: string | null;
}
