import mongoose, { Schema, Document, Model } from "mongoose";

interface IScore extends Document {
    student: mongoose.Schema.Types.ObjectId;
    subject: mongoose.Schema.Types.ObjectId;
    score: number;
}

const scoreSchema = new Schema<IScore>({
    student: { type: Schema.Types.ObjectId, ref: 'Students', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subjects', required: true },
    score: { type: Number },
});

const Score: Model<IScore> = mongoose.model<IScore>("Scores", scoreSchema);

export default Score;
