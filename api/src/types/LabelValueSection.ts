// src/types/LabelValueSection.ts

export interface LabelValueItem {
    label: string;
    value: string;
}

export interface LabelValueSection {
    title: string;
    type: 'labelValue';
    items: {
        title: string;
        content: LabelValueItem[];
    }[];
}
