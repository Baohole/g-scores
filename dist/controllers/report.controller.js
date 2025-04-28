"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showReport = void 0;
const scores_model_1 = __importDefault(require("../models/scores.model"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const mongoose_1 = __importDefault(require("mongoose"));
var Levels;
(function (Levels) {
    Levels["excellent"] = "Excellent";
    Levels["good"] = "Good";
    Levels["pass"] = "Pass";
    Levels["fail"] = "Fail";
})(Levels || (Levels = {}));
function assignLevel(score) {
    if (score >= 8) {
        return Levels.excellent;
    }
    else if (score >= 6 && score < 8) {
        return Levels.good;
    }
    else if (score >= 4 && score < 6) {
        return Levels.pass;
    }
    else {
        return Levels.fail;
    }
}
function assignLevelsToScores(scores) {
    return scores.map(score => ({
        score,
        level: assignLevel(score)
    }));
}
const showReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sid = req.query.subject_indx;
        let scores = [{
                score: Number,
                level: Levels
            }];
        if (sid) {
            const sScores = yield scores_model_1.default.aggregate([
                {
                    $match: { subject: new mongoose_1.default.Types.ObjectId(sid) }
                }
            ]);
            scores = assignLevelsToScores(sScores.map(s => s.score));
        }
        let subjects;
        try {
            subjects = yield subject_model_1.default.find();
        }
        catch (error) {
            console.error("Error fetching subjects:", error);
        }
        res.render('pages/report', {
            pageTitle: 'Report',
            subjects,
            sid,
            scores
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.showReport = showReport;
//# sourceMappingURL=report.controller.js.map