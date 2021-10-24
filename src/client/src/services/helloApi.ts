import { AxiosResponse } from "axios";
import api from "./apiConfig";

interface HelloResponseI extends AxiosResponse {
   data: {
      message: string;
   }
}

export const apiHello = async (): Promise<string | null> => {
   try {
      const response: HelloResponseI = await api().get('/hello');
      if (response) {
         return response.data.message;
      }
      return null;
   } catch (err) {
      return null;
   }
}