// src/components/MultiColumnBulletedListSection.ts

// @ts-nocheck

import { Paragraph, Table, TableCell, TableRow, WidthType, TextRun, AlignmentType, BorderStyle } from 'docx';
import { SectionData } from '../types/SectionData';
import { SectionConfig } from '../types/SectionConfig';

export function createMultiColumnBulletedListSection(
    sectionData: SectionData,
    config: SectionConfig
): Paragraph[] {
    const { content, columnCount } = sectionData;
    const {
        fontFamily,
        contentFontSize,
        titleColor,
    } = config;

    // Ensure content is an array (since this is for bulleted lists)
    const bulletPoints = Array.isArray(content) ? content : [];

    // Split bullet points into columns
    const columnLength = Math.ceil(bulletPoints.length / columnCount);
    const columns = [];

    for (let i = 0; i < columnCount; i++) {
        columns.push(bulletPoints.slice(i * columnLength, (i + 1) * columnLength));
    }

    // Create a table for multi-column bullets
    const tableRows = [];

    for (let i = 0; i < columnLength; i++) {
        const cells = columns.map((column) =>
            new TableCell({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        bullet: {
                            level: 0,
                        },
                        children: [
                            new TextRun({
                                text: column[i] || '', // Handle case where some columns are shorter
                                font: fontFamily,
                                size: contentFontSize * 2, // Size is in half-points
                                color: titleColor,
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 100 / columnCount, // Distribute columns equally
                    type: WidthType.PERCENTAGE,
                },
                borders: {
                    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                }
            })
        );

        tableRows.push(new TableRow({
            children: cells,
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            }
        }));
    }

    const table = new Table({
        rows: tableRows,
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        }
    });

    return [table];
}
