import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { toast } from 'react-hot-toast';

export const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageType, setImageType] = useState<boolean | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadImage, loading } = useImageContext();
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB
                toast.error('La imagen no debe superar los 10MB');
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                toast.error('El archivo debe ser una imagen');
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedFile) {
            toast.error('Por favor selecciona una imagen');
            return;
        }

        if (imageType === null) {
            toast.error('Por favor selecciona el tipo de imagen (Real o IA)');
            return;
        }

        try {
            await uploadImage(selectedFile, imageType);
            navigate('/');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setImageType(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Subir Imagen</h1>
                <p className="mt-2 text-gray-600">
                    Sube una imagen y clasifícala como Real o generada por IA
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Imagen
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {previewUrl ? (
                                <div>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="mx-auto h-64 w-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="mt-2 text-sm text-red-600 hover:text-red-500"
                                    >
                                        Eliminar imagen
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Subir una imagen</span>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="pl-1">o arrastra y suelta</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF hasta 10MB
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Imagen
                    </label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-green-600"
                                name="imageType"
                                checked={imageType === true}
                                onChange={() => setImageType(true)}
                            />
                            <span className="ml-2">Real</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-red-600"
                                name="imageType"
                                checked={imageType === false}
                                onChange={() => setImageType(false)}
                            />
                            <span className="ml-2">IA</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !selectedFile || imageType === null}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Subiendo...' : 'Subir Imagen'}
                    </button>
                </div>
            </form>
        </div>
    );
};