// src/types/SectionData.ts

export interface SectionData {
    title: string;
    type: string; // Specify the allowed types
    content: string | string[];    // Allow both string and string[]
}
