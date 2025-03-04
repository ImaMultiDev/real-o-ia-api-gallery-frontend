export interface Image {
    id: number;
    url: string;
    real: boolean;
}

export interface ImageUpload {
    file: File;
    real: boolean;
}

export interface ImageResponse {
    content: Image[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
}