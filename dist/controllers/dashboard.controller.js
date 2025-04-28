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
exports.showDashBoard = void 0;
const scores_model_1 = __importDefault(require("../models/scores.model"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const showDashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield subject_model_1.default.find({
            name: { $in: ["Math", "Physics", "Chemistry"] }
        });
        const mathScores = yield scores_model_1.default.aggregate([{ $match: { subject: subjects[0].id } }]);
        const Pscores = yield scores_model_1.default.aggregate([{ $match: { subject: subjects[1].id } }]);
        const chemistryScores = yield scores_model_1.default.aggregate([{ $match: { subject: subjects[2].id } }]);
        const scores = {};
        for (const s of [...mathScores, ...Pscores, ...chemistryScores]) {
            const stnt = yield student_model_1.default.findOne({ _id: s.student });
            const sbd = stnt.sbd;
            if (!scores[sbd]) {
                scores[sbd] = 0;
            }
            scores[sbd] += s.score;
        }
        const sortedScores = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10);
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
        console.log(err);
    }
});
exports.showDashBoard = showDashBoard;
//# sourceMappingURL=dashboard.controller.js.map