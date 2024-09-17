// src/components/TextSection.ts

// @ts-nocheck

import { Paragraph, TextRun, AlignmentType } from 'docx';
import { SectionData } from '../types/SectionData';
import { SectionConfig } from '../types/SectionConfig';

export function createTextSection(
    sectionData: SectionData,
    config: SectionConfig
): Paragraph[] {
    const { content } = sectionData;
    const {
        fontFamily,
        contentFontSize,
        titleColor,
    } = config;

    // Split content by double newlines to create separate paragraphs
    const contentLines = content.split('\n\n');
    const contentParagraphs = contentLines.map(
        (line) =>
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: line,
                        font: fontFamily,
                        size: contentFontSize * 2,
                        color: titleColor,
                    }),
                ],
                spacing: { after: 200 },
            })
    );

    return contentParagraphs;
}
