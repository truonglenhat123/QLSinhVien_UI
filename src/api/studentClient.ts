import axiosClient from "../utils/axiosClient";
export const getAll = async ():Promise<any[]> => {
  const result = await axiosClient.get("/student");
  return result as any;
};


