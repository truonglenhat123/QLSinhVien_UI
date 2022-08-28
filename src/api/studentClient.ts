import { StudentState } from "../features/student/studentSlice";
import axiosClient from "../utils/axiosClient";
export const getAll = async ():Promise<any[]> => {
  const result = await axiosClient.get("/student");
  return result as any;
};

export const getById = async (id: number):Promise<any[]> => {
  // eslint-disable-next-line no-template-curly-in-string
  const result = await axiosClient.get<StudentState>(`/student/${id}`);
  return result as any;
};

export const create = async (data: any[]):Promise<any[]> => {
  // eslint-disable-next-line no-template-curly-in-string
  const result = await axiosClient.post<any>("/student",data);
  return result as any;
};

export const update = async (id:number,data: any[]):Promise<any[]> => {
  // eslint-disable-next-line no-template-curly-in-string
  const result = await axiosClient.put(`/student/${id}`,data);
  return result as any;
};

export const remove = async (id:any):Promise<any[]> => {
  // eslint-disable-next-line no-template-curly-in-string
  const result = await axiosClient.delete<any>(`/student/${id}`,);
  return result as any;
};






