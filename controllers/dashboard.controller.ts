import { Request, Response, NextFunction } from 'express';
import createHttpError from "http-errors";
import Score from '../models/scores.model';
import Subject from '../models/subject.model';
import Student from '../models/student.model';
import mongoose from 'mongoose';

export const showDashBoard = async (req: Request, res: Response): Promise<any> => {
    try {
        const subjects = await Subject.find({
            name: { $in: ["Math", "Physics", "Chemistry"] }
        });
        const mathScores = await Score.aggregate([{ $match: { subject: subjects[0].id } }]);
        const Pscores = await Score.aggregate([{ $match: { subject: subjects[1].id } }])
        const chemistryScores = await Score.aggregate([{ $match: { subject: subjects[2].id } }]);
        const scores: { [key: string]: number } = {};
        for (const s of [...mathScores, ...Pscores, ...chemistryScores]) {
            const stnt = await Student.findOne({ _id: s.student });
            const sbd: string = stnt.sbd
            if (!scores[sbd]) {
                scores[sbd] = 0;
            }

            scores[sbd] += s.score;
        }
        const sortedScores = Object.entries(scores)
            .sort(([, a], [, b]) => b - a) // Sort by score in descending order
            .slice(0, 10); // Get top 10 highest scores
        const topStudents = sortedScores.map(([sbd, score]) => ({
            sbd,
            score
        }));

        res.render('pages/dashboard', {
            pageTitle: 'Dashboard',
            topStudents
        });
    }
    catch (err) {
        console.log(err)
    }
}