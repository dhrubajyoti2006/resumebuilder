// src/components/Section.ts

// @ts-nocheck

import {Paragraph, TextRun, BorderStyle, AlignmentType, PageBreak} from 'docx';
import {SectionData} from '../types/SectionData';
import {SectionConfig} from '../types/SectionConfig';
import {createBulletListSection} from './BulletListSection';
import {createMultiColumnBulletedListSection} from './MultiColumnBulletedListSection';
import {createTitledBulletedListSection} from "./TitledBulletedListSection";

export function createSection(
    sectionData: SectionData,
    config: SectionConfig
): Paragraph[] {
    const {title, type} = sectionData;
    const {
        fontFamily,
        titleFontSize,
        contentFontSize,
        titleColor,
        titleAlignment,
    } = config;

    // Map alignment string to AlignmentType enum values
    const alignmentMap = {
        left: AlignmentType.LEFT,
        center: AlignmentType.CENTER,
        right: AlignmentType.RIGHT,
        justify: AlignmentType.JUSTIFIED,
    };
    const alignment = alignmentMap[titleAlignment.toLowerCase()] || AlignmentType.LEFT;

    // Create title paragraph with dashed underline
    const titleParagraph = new Paragraph({
        alignment: alignment,
        children: [
            new TextRun({
                text: title.toUpperCase(),
                bold: true,
                font: fontFamily,
                size: titleFontSize * 2,
                color: titleColor,
            }),
        ],
        border: {
            bottom: {
                color: titleColor,  // Use the same color as the title text
                space: 1,  // Space between text and the border
                style: BorderStyle.DASHED,  // Dashed border style for underline
                size: 6,  // Thickness of the dashed line
            },
        },
        spacing: {after: 200},   // Adjust spacing after the title
    });

    let contentParagraphs: Paragraph[] = [];

    // Handle 'text' section type
    if (type === 'text') {
        const contentLines = sectionData.content.split('\n\n');
        contentParagraphs = contentLines.map(
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
                    spacing: {after: 200},
                })
        );
    }

    // Handle 'bulletedList' section type
    if (type === 'bulletedList') {
        contentParagraphs = createBulletListSection(sectionData, config);
    }

    // Handle 'multiColumnBulletedList' section type
    if (type === 'multiColumnBulletedList') {
        contentParagraphs = createMultiColumnBulletedListSection(sectionData, config);
    }

    // Handle 'pageBreak' section type
    if (type === 'pageBreak') {
        contentParagraphs = [
            new Paragraph({
                children: [new PageBreak()],
            }),
        ];
    }

    if (type === 'titledBulletedList') {
        contentParagraphs = createTitledBulletedListSection(sectionData, config);
    }

    // Return the title paragraph followed by the content paragraphs
    return [titleParagraph, ...contentParagraphs];
}
