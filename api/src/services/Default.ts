// src/components/TitledBulletedListSection.ts

// @ts-nocheck

import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TitledBulletedListSection } from '../types/TitledBulletedListSection';
import { SectionConfig } from '../types/SectionConfig';

export function createTitledBulletedListSection(
    sectionData: TitledBulletedListSection,
    config: SectionConfig
): Paragraph[] {
    const {
        fontFamily,
        contentFontSize,
        titleColor,
    } = config;

    let contentParagraphs: Paragraph[] = [];

    // Create items with title and bulleted content
    sectionData.items.forEach((item) => {
        // Add the title for each item (e.g., job role and company details)
        if (item.title.trim()) {
            contentParagraphs.push(
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: item.title,
                            bold: true,
                            font: fontFamily,
                            size: contentFontSize * 2,
                            color: titleColor,
                        }),
                    ],
                    spacing: { after: 100 },
                })
            );
        }

        // If content length is 1, don't use bullets
        if (item.content.length === 1) {
            contentParagraphs.push(
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: item.content[0],
                            font: fontFamily,
                            size: contentFontSize * 2,
                            color: titleColor,
                        }),
                    ],
                    spacing: { after: 100 },
                })
            );
        } else {
            // Add bullet points for each item if content has more than 1 element
            item.content.forEach((bullet) => {
                contentParagraphs.push(
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        bullet: {
                            level: 0,
                        },
                        children: [
                            new TextRun({
                                text: bullet,
                                font: fontFamily,
                                size: contentFontSize * 2,
                                color: titleColor,
                            }),
                        ],
                        spacing: { after: 100 },
                    })
                );
            });
        }
    });

    return contentParagraphs;
}
