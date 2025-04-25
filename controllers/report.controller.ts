import { Request, Response, NextFunction } from 'express';
import createHttpError from "http-errors";

import Score from '../models/scores.model';
import Subject from '../models/subject.model';
import mongoose, { Types } from 'mongoose';

enum Levels {
    excellent = "Excellent",
    good = "Good",
    pass = "Pass",
    fail = "Fail"
}

function assignLevel(score: number): Levels {
    if (score >= 8) {
        return Levels.excellent;
    } else if (score >= 6 && score < 8) {
        return Levels.good;
    } else if (score >= 4 && score < 6) {
        return Levels.pass;
    } else {
        return Levels.fail;
    }
}

// Example usage with an array of scores
function assignLevelsToScores(scores: number[]): { score: number, level: Levels }[] {
    return scores.map(score => ({
        score,
        level: assignLevel(score)
    }));
}


export const showReport = async (req: Request, res: Response): Promise<any> => {
    try {
        const sid: string = (req.query.subject_indx as string);
        let scores: Array<object> = [{
            score: Number,
            level: Levels
        }]

        if (sid) {
            const sScores = await Score.aggregate([
                {
                    $match: { subject: sid }
                }
            ]);
            scores = assignLevelsToScores(sScores.map(s => s.score))
        }

        let subjects;
        try {
            subjects = await Subject.find();
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
        res.render('pages/report', {
            pageTitle: 'Report',
            subjects,
            sid,
            scores
        })
    }
    catch (err) {
        console.log(err)
    }
}