import axios from 'axios';
import { Image, ImageResponse, ImageUpload } from '../interfaces/Image';

const API_URL = `${import.meta.env.VITE_API_URL}/images`;

export const imageService = {
    uploadImage: async ({ file, real }: ImageUpload): Promise<Image> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('real', String(real));

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getImages: async (page: number = 0, size: number = 20): Promise<ImageResponse> => {
        const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
        return response.data;
    },

    getImagesByType: async (real: boolean, page: number = 0, size: number = 20): Promise<ImageResponse> => {
        const response = await axios.get(`${API_URL}?real=${real}&page=${page}&size=${size}`);
        return response.data;
    },

    deleteImage: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};