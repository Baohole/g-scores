import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import mongoose, { Types } from 'mongoose';



import Subject from '../models/subject.model';
import Student from '../models/student.model';
import Score from '../models/scores.model';

import * as database from '../config/database';
database.connect()

enum SUBJECTS {
    toan = "Math",
    ngu_van = "Literature",
    ngoai_ngu = "Foreign Language",
    vat_li = "Physics",
    hoa_hoc = "Chemistry",
    sinh_hoc = "Biology",
    lich_su = "History",
    dia_li = "Geography",
    gdcd = "Civic"
}

interface ScoreRecord {
    SBD: string;
    [key: string]: string;
}

async function main() {
    // 1. Seed subjects
    const subjectMap: Record<string, string> = {};
    for (const [, name] of Object.entries(SUBJECTS)) {
        let subject = await Subject.findOne({ name });
        if (!subject) {
            subject = await Subject.create({ name });
        }
        subjectMap[name] = subject.id;
    }

    // 2. Read CSV
    const results: ScoreRecord[] = [];
    const filePath = path.join(__dirname, 'diem_thi_thpt_2024.csv');

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data: ScoreRecord) => results.push(data))
            .on('end', async () => {
                try {
                    for (const row of results) {
                        const sbd: string = row['sbd'];
                        const language_id = row['ma_ngoai_ngu'];
                        if (!sbd) continue;

                        let student = await Student.findOne({ sbd });
                        if (!student) {
                            student = await Student.create({ sbd, language_id });
                        }

                        for (const [key, name] of Object.entries(SUBJECTS)) {
                            const rawScore = row[key];
                            if (rawScore && !isNaN(parseFloat(rawScore))) {
                                await Score.create({
                                    student: student._id,
                                    subject: subjectMap[name],
                                    score: parseFloat(rawScore)
                                });
                            }
                        }
                    }

                    console.log("✅ Seeding complete");
                    await mongoose.disconnect();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    });
}

main().catch(err => {
    console.error(err);
    mongoose.disconnect();
    process.exit(1);
});
