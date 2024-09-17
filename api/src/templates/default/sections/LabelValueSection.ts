// src/components/LabelValueSection.ts

// @ts-nocheck

import { Paragraph, TextRun, AlignmentType } from 'docx';
import { LabelValueSection } from '../types/LabelValueSection';
import { SectionConfig } from '../types/SectionConfig';

export function createLabelValueSection(
    sectionData: LabelValueSection,
    config: SectionConfig
): Paragraph[] {
    const {
        fontFamily,
        contentFontSize,
        titleColor,
    } = config;

    let contentParagraphs: Paragraph[] = [];

    // Create the label-value pairs
    sectionData.items.forEach((item) => {
        item.content.forEach((labelValue) => {
            contentParagraphs.push(
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: `${labelValue.label}:\t`, // Label with colon
                            bold: true,
                            font: fontFamily,
                            size: contentFontSize * 2,
                            color: titleColor,
                        }),
                        new TextRun({
                            text: ` ${labelValue.value}`, // Value follows the label
                            font: fontFamily,
                            size: contentFontSize * 2,
                            color: titleColor,
                        }),
                    ],
                    spacing: { after: 100 },
                })
            );
        });
    });

    return contentParagraphs;
}
