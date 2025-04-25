import { Request, Response, NextFunction } from 'express';
import createHttpError from "http-errors";

import Student from '../models/student.model';
import Score from '../models/scores.model';
import Subject from '../models/subject.model';

export const showDashBoard = async (req: Request, res: Response): Promise<any> => {
    try {
        const { sbd }: { sbd: string } = req.query as any;
        let sScores;
        if (sbd) {
            const student = await Student.findOne({
                sbd: sbd
            })
            if (student) {
                let scores = await Score.aggregate([{
                    $match: { student: student.id }
                },]);

                sScores = await Promise.all(
                    scores.map(async (s) => {
                        const subject = await Subject.findById(s.subject).lean();
                        return {
                            score: s.score,
                            subjectName: subject?.name || 'Unknown',
                        };
                    })
                );
            }
        }
        res.render('pages/search', {
            pageTitle: 'Search',
            sbd,
            sScores,
        })
    }
    catch (err) {
        console.log(err)
    }

}