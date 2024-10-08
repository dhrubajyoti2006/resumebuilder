// src/types/TitledBulletedListSection.ts

export interface TitledBulletedListSection {
    title: string;
    type: 'titledBulletedList';
    items: {
        title: string;
        content: string[];
    }[];
}
