// src/components/BulletListSection.ts

// @ts-nocheck

import { Paragraph, TextRun, AlignmentType } from 'docx';
import { SectionData } from '../types/SectionData';
import { SectionConfig } from '../types/SectionConfig';

export function createBulletListSection(
    sectionData: SectionData,
    config: SectionConfig
): Paragraph[] {
    const { content } = sectionData;
    const {
        fontFamily,
        contentFontSize,
        titleColor,
    } = config;

    // Ensure content is an array (since this is for bulleted lists)
    const bulletPoints = Array.isArray(content) ? content : [];

    // Define the left indent to align with other sections
    const leftIndent = 380; // Adjust this value to match the indentation of other sections (720 is roughly 0.5 inch)

    // Create bullet paragraphs
    const bulletParagraphs = bulletPoints.map((point) =>
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED, // Ensure the text is justified
            bullet: {
                level: 0, // Set bullet level
            },
            indent: {
                left: leftIndent,  // Align the text of the bullet point with other sections
                hanging: 360,      // Hanging indent to position the bullet to the left of the text
            },
            children: [
                new TextRun({
                    text: point,
                    font: fontFamily,
                    size: contentFontSize * 2, // Size is in half-points
                    color: titleColor,
                }),
            ],
            spacing: { after: 100 }, // Adjust spacing if necessary
        })
    );

    return bulletParagraphs;
}
