import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link 
                                to="/"
                                className={`inline-flex items-center px-4 py-2 border-b-2 ${
                                    location.pathname === '/' 
                                    ? 'border-indigo-500 text-gray-900' 
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Galería
                            </Link>
                            <Link 
                                to="/upload"
                                className={`inline-flex items-center px-4 py-2 border-b-2 ${
                                    location.pathname === '/upload' 
                                    ? 'border-indigo-500 text-gray-900' 
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Subir Imagen
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};