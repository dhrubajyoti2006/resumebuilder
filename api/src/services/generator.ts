// src/generator.ts
// @ts-nocheck

import { Document, Packer } from 'docx';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { createHeader } from './Header';
import { createSection } from './Section';
import * as config from './config.json';
import { HeaderData } from '../types/HeaderData';
import { SectionData } from '../types/SectionData';

// Import data from data.json
import * as data from './data.json';

export async function generateDoc(): Promise<void> {
    // Access header data and sections from data.json
    const headerData: HeaderData = data.headerData;
    const sections: SectionData[] = data.sections;  // The type should now accept both string and string[]

    // Access configurations from config.json
    const headerConfig = config.header;
    const sectionConfig = config.section;

    // Create the document
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 720,   // 0.5 inch
                            bottom: 720,
                            left: 720,
                            right: 720,
                        },
                    },
                },
                children: [
                    createHeader(headerData, headerConfig),
                    ...sections.flatMap((sectionData) => createSection(sectionData, sectionConfig)),
                ],
            },
        ],
    });

    // Define the output path
    const outputPath = path.join(__dirname, '..', 'generated', 'SampleDocument.docx');

    // Generate and save the document
    try {
        const buffer = await Packer.toBuffer(doc);
        writeFileSync(outputPath, buffer);
        console.log('Word document created successfully at:', outputPath);
    } catch (error) {
        console.error('Error creating Word document:', error);
        throw error;
    }
}
