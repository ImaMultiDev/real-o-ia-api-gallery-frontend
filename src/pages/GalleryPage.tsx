import { useEffect } from 'react';
import { ImageCard } from '../components/ImageCard';
import { ImageFilter } from '../components/ImageFilter';
import { useImageContext } from '../context/ImageContext';

export const GalleryPage = () => {
    const { 
        images, 
        loading, 
        totalPages, 
        currentPage, 
        loadImages, 
        deleteImage,
        filterByType 
    } = useImageContext();

    useEffect(() => {
        loadImages();
    }, []);

    const renderPagination = () => {
        return (
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => loadImages(i)}
                        className={`px-4 py-2 text-sm ${
                            currentPage === i
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Galería de Imágenes</h1>
                <p className="mt-2 text-gray-600">
                    Explora y gestiona tu colección de imágenes
                </p>
            </div>

            <ImageFilter onFilter={filterByType} />

            {images.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No hay imágenes para mostrar</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map(image => (
                            <ImageCard 
                                key={image.id} 
                                image={image} 
                                onDelete={deleteImage}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && renderPagination()}
                </>
            )}
        </div>
    );
};