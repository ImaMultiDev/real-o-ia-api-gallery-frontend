import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './layouts/MainLayout';
import { GalleryPage } from './pages/GalleryPage';
import { UploadPage } from './pages/UploadPage';
import { ImageProvider } from './context/ImageContext';

function App() {
  return (
    <BrowserRouter>
      <ImageProvider>
        <Toaster position="top-right" />
        <MainLayout>
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </MainLayout>
      </ImageProvider>
    </BrowserRouter>
  );
}

export default App;
