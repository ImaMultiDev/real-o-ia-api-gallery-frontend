import { createContext, useContext, useState, ReactNode } from 'react';
import { Image, ImageResponse } from '../interfaces/Image';
import { imageService } from '../services/imageService';
import { toast } from 'react-hot-toast';

interface ImageContextType {
    images: Image[];
    loading: boolean;
    totalPages: number;
    currentPage: number;
    loadImages: (page?: number) => Promise<void>;
    deleteImage: (id: number) => Promise<void>;
    uploadImage: (file: File, real: boolean) => Promise<void>;
    filterByType: (real: boolean | null) => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentFilter, setCurrentFilter] = useState<boolean | null>(null);

    const handleResponse = (response: ImageResponse) => {
        setImages(response.content);
        setTotalPages(response.totalPages);
        setCurrentPage(response.pageable.pageNumber);
    };

    const loadImages = async (page: number = 0) => {
        try {
            setLoading(true);
            const response = currentFilter !== null
                ? await imageService.getImagesByType(currentFilter, page)
                : await imageService.getImages(page);
            handleResponse(response);
        } catch (error) {
            toast.error('Error al cargar las imágenes');
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (id: number) => {
        try {
            setLoading(true);
            await imageService.deleteImage(id);
            toast.success('Imagen eliminada correctamente');
            await loadImages(currentPage);
        } catch (error) {
            toast.error('Error al eliminar la imagen');
            console.error('Error deleting image:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file: File, real: boolean) => {
        try {
            setLoading(true);
            await imageService.uploadImage({ file, real });
            toast.success('Imagen subida correctamente');
            await loadImages(0); // Volver a la primera página después de subir
        } catch (error) {
            toast.error('Error al subir la imagen');
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterByType = async (real: boolean | null) => {
        setCurrentFilter(real);
        try {
            setLoading(true);
            if (real === null) {
                const response = await imageService.getImages(0);
                handleResponse(response);
            } else {
                const response = await imageService.getImagesByType(real, 0);
                handleResponse(response);
            }
        } catch (error) {
            toast.error('Error al filtrar las imágenes');
            console.error('Error filtering images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageContext.Provider value={{
            images,
            loading,
            totalPages,
            currentPage,
            loadImages,
            deleteImage,
            uploadImage,
            filterByType
        }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = () => {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context;
};