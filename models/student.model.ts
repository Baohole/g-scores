import mongoose, { Schema, Document, Model } from "mongoose";


interface IStudent extends Document {
    sbd: string;
    language_id: string;
}

const studentSchema = new Schema<IStudent>(
    {
        sbd: { type: String },
        language_id: { type: String },
    },
    {
        timestamps: true,
    }
);

const Student: Model<IStudent> = mongoose.model<IStudent>(
    "Students",
    studentSchema
);

export default Student;
