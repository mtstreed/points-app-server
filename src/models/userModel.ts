import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: number;
    name: string;
    points: number;
    rank: number;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true }, 
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
});
export const User = mongoose.model<IUser>('User', userSchema);

