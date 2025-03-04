interface ImageFilterProps {
    onFilter: (real: boolean | null) => Promise<void>;
}

export const ImageFilter = ({ onFilter }: ImageFilterProps) => {
    return (
        <div className="flex gap-2 mb-6">
            <button
                onClick={() => onFilter(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Todas
            </button>
            <button
                onClick={() => onFilter(true)}
                className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Reales
            </button>
            <button
                onClick={() => onFilter(false)}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                IA
            </button>
        </div>
    );
};