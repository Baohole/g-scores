import mongoose, { Schema, Document, Model } from "mongoose";

interface ISubject extends Document {
    name: string;
}

const subjectSchema = new Schema<ISubject>({
    name: { type: String, unique: true, required: true },
});

const Subject: Model<ISubject> = mongoose.model<ISubject>("Subjects", subjectSchema);

export default Subject;
