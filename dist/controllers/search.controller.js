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
const student_model_1 = __importDefault(require("../models/student.model"));
const scores_model_1 = __importDefault(require("../models/scores.model"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const showDashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sbd } = req.query;
        let sScores;
        if (sbd) {
            const student = yield student_model_1.default.findOne({
                sbd: sbd
            });
            if (student) {
                let scores = yield scores_model_1.default.aggregate([{
                        $match: { student: student._id }
                    }]);
                sScores = yield Promise.all(scores.map((s) => __awaiter(void 0, void 0, void 0, function* () {
                    const subject = yield subject_model_1.default.findById(s.subject).lean();
                    return {
                        score: s.score,
                        subjectName: (subject === null || subject === void 0 ? void 0 : subject.name) || 'Unknown',
                    };
                })));
            }
        }
        res.render('pages/search', {
            pageTitle: 'Search',
            sbd,
            sScores,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.showDashBoard = showDashBoard;
//# sourceMappingURL=search.controller.js.map