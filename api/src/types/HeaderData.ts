// src/types/HeaderData.ts

export interface HeaderData {
    name: string;
    imageUrl: string;
    tags: string[];
    contact: {
        email: string;
        mobile: string;
        linkedin: string;
        location: string;
    };
}
