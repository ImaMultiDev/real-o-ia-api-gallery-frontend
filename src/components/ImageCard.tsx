import { TrashIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Image } from '../interfaces/Image';
import { toast } from 'react-hot-toast';

interface ImageCardProps {
    image: Image;
    onDelete: (id: number) => Promise<void>;
}

export const ImageCard = ({ image, onDelete }: ImageCardProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(image.url);
            setCopied(true);
            toast.success('URL copiada al portapapeles');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Error al copiar la URL');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
            await onDelete(image.id);
        }
    };

    return (
        <div className="relative group bg-white rounded-lg shadow-md overflow-hidden">
            <img 
                src={image.url} 
                alt="Imagen de la galería" 
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        image.real 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                        {image.real ? 'Real' : 'IA'}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={copyToClipboard}
                            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Copiar URL"
                        >
                            {copied ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            ) : (
                                <ClipboardIcon className="h-5 w-5" />
                            )}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                            title="Eliminar imagen"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};