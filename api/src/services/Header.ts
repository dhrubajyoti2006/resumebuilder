// src/components/Header.ts

import {
    Table,
    TableCell,
    TableRow,
    WidthType,
    Paragraph,
    ImageRun,
    AlignmentType,
    TextRun,
    ExternalHyperlink,
    BorderStyle,
} from 'docx';
import { readFileSync } from 'fs';
import * as path from 'path';
import { HeaderData } from '../types/HeaderData';
import { HeaderConfig } from '../types/HeaderConfig';

export function createHeader(data: HeaderData, config: HeaderConfig): Table {
    const { name, imageUrl, tags, contact } = data;
    const {
        fontFamily,
        tagsFontSize,
        contactFontSize,
        nameAndContactColor,
        tagsColor,
    } = config;

    let imageRun: ImageRun;

    try {
        const imagePath = path.join(__dirname, '..', '..', imageUrl);
        const imageBuffer = readFileSync(imagePath);

        imageRun = new ImageRun({
            data: imageBuffer,
            transformation: {
                width: 100,
                height: 100,
            },
        });
    } catch (error) {
        console.error('Error loading image:', error);
        imageRun = new ImageRun({
            data: Buffer.alloc(0),
            transformation: {
                width: 0,
                height: 0,
            },
        });
    }

    // First column with the image
    const imageCell = new TableCell({
        width: { size: 800, type: WidthType.PERCENTAGE }, // 10% width
        children: [new Paragraph({ children: [imageRun], alignment: AlignmentType.CENTER })],
        verticalAlign: 'center',
        textDirection: "lrTb",
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        },
    });

    // Second column with name and tags
    const nameParagraph = new Paragraph({
        children: [
            new TextRun({
                bold: true,
                text: name,
                color: nameAndContactColor,
                font: fontFamily,
                size: 32, // Name text size set to 16 (16 * 2)
            }),
        ],
        spacing: { after: 100 },
    });

    const tagsParagraph = new Paragraph({
        children: [
            new TextRun({
                text: tags.join(' | '),
                color: tagsColor,
                font: fontFamily,
                size: tagsFontSize * 2,
            }),
        ],
    });

    const secondColumn = new TableCell({
        width: { size: 2400, type: WidthType.PERCENTAGE }, // 45% width
        children: [nameParagraph, tagsParagraph],
        verticalAlign: 'top',
        margins: {
            left: 244, // Left padding in twips (0.1 inches)
        },
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        },
    });

    // Third column with contact information
    const contactHeading = new Paragraph({
        children: [
            new TextRun({
                text: 'Contact:',
                bold: true,
                color: nameAndContactColor,
                font: fontFamily,
                size: 24, // "Contact" text size set to 12 (12 * 2)
            }),
        ],
        spacing: { after: 100 },
    });

    const emailParagraph = new Paragraph({
        children: [
            new TextRun({
                text: 'Email: ',
                font: fontFamily,
                size: 21, // 10.5 * 2
            }),
            new ExternalHyperlink({
                children: [
                    new TextRun({
                        text: contact.email,
                        style: 'Hyperlink',
                        font: fontFamily,
                        size: 21,
                    }),
                ],
                link: `mailto:${contact.email}`,
            }),
        ],
    });

    const linkedinParagraph = new Paragraph({
        children: [
            new TextRun({
                text: 'LinkedIn: ',
                font: fontFamily,
                size: 21,
            }),
            new ExternalHyperlink({
                children: [
                    new TextRun({
                        text: '/dhrubajyotirakshit',
                        style: 'Hyperlink',
                        font: fontFamily,
                        size: 21,
                    }),
                ],
                link: contact.linkedin,
            }),
        ],
    });

    const mobileParagraph = new Paragraph({
        children: [
            new TextRun({
                text: `M: ${contact.mobile}`,
                font: fontFamily,
                size: 21,
            }),
        ],
    });

    const locationParagraph = new Paragraph({
        children: [
            new TextRun({
                text: `Location: ${contact.location}`,
                font: fontFamily,
                size: 21,
            }),
        ],
    });

    const thirdColumn = new TableCell({
        children: [
            contactHeading,
            emailParagraph,
            mobileParagraph,
            linkedinParagraph,
            locationParagraph,
        ],
        verticalAlign: 'top',
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        },
    });

    // Create the header table
    const headerTable = new Table({
        width: { size: 100 * 50, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({
                children: [imageCell, secondColumn, thirdColumn],
            }),
        ],
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        },
    });

    return headerTable;
}
