# Real vs IA - Galería de Imágenes Frontend

Frontend desarrollado con React + TypeScript + Vite para la gestión de imágenes con clasificación Real/IA.

## Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

## Requisitos

- Node.js >= 18
- npm o pnpm

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Copiar el archivo de configuración de ejemplo:
```bash
cp .env.example .env
```

3. Ajustar las variables de entorno en `.env` si es necesario.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción
- `npm run format` - Formatea el código
- `npm run typecheck` - Verifica los tipos de TypeScript

## Estructura del Proyecto

```
src/
  ├── components/      # Componentes reutilizables
  ├── context/        # Contextos de React
  ├── interfaces/     # Tipos e interfaces de TypeScript
  ├── layouts/        # Layouts de la aplicación
  ├── pages/          # Componentes de páginas
  └── services/       # Servicios y llamadas a la API
```

## Características

- Subida de imágenes a Cloudinary
- Clasificación de imágenes (Real/IA)
- Galería con paginación
- Filtrado por tipo de imagen
- Copiado de URL al portapapeles
- Eliminación de imágenes
- Notificaciones toast
- Diseño responsive

## Licencia

MIT
