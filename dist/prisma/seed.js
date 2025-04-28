"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const scores_model_1 = __importDefault(require("../models/scores.model"));
const database = __importStar(require("../config/database"));
database.connect();
var SUBJECTS;
(function (SUBJECTS) {
    SUBJECTS["toan"] = "Math";
    SUBJECTS["ngu_van"] = "Literature";
    SUBJECTS["ngoai_ngu"] = "Foreign Language";
    SUBJECTS["vat_li"] = "Physics";
    SUBJECTS["hoa_hoc"] = "Chemistry";
    SUBJECTS["sinh_hoc"] = "Biology";
    SUBJECTS["lich_su"] = "History";
    SUBJECTS["dia_li"] = "Geography";
    SUBJECTS["gdcd"] = "Civic";
})(SUBJECTS || (SUBJECTS = {}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const subjectMap = {};
        for (const [, name] of Object.entries(SUBJECTS)) {
            let subject = yield subject_model_1.default.findOne({ name });
            if (!subject) {
                subject = yield subject_model_1.default.create({ name });
            }
            subjectMap[name] = subject.id;
        }
        const results = [];
        const filePath = path_1.default.join(__dirname, 'diem_thi_thpt_2024.csv');
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    for (const row of results) {
                        const sbd = row['sbd'];
                        const language_id = row['ma_ngoai_ngu'];
                        if (!sbd)
                            continue;
                        let student = yield student_model_1.default.findOne({ sbd });
                        if (!student) {
                            student = yield student_model_1.default.create({ sbd, language_id });
                        }
                        for (const [key, name] of Object.entries(SUBJECTS)) {
                            const rawScore = row[key];
                            if (rawScore && !isNaN(parseFloat(rawScore))) {
                                yield scores_model_1.default.create({
                                    student: student._id,
                                    subject: subjectMap[name],
                                    score: parseFloat(rawScore)
                                });
                            }
                        }
                    }
                    console.log("✅ Seeding complete");
                    yield mongoose_1.default.disconnect();
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            }))
                .on('error', reject);
        });
    });
}
main().catch(err => {
    console.error(err);
    mongoose_1.default.disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map