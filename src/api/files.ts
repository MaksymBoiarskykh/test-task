import axios from 'axios';
import { IFile } from '../init/models/file';
import { APP } from '../init/constants/app';

export const getFiles = async () => {
  try {
    const response = await axios.get(`${APP.BASE_REST_API_URL}/files`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFile = async (file: IFile) => {
  try {
    const response = await axios.post(`${APP.BASE_REST_API_URL}/files`, file);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (id: string) => {
  try {
    const response = await axios.delete(`${APP.BASE_REST_API_URL}/files/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubFiles = async (id: string, file: IFile) => {
  try {
    const response = await axios.put(
      `${APP.BASE_REST_API_URL}/files/${id}`,
      file
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
