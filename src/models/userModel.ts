import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: number;
    name: string;
    points: number;
    rank: number;
    email: string;
    auth0Id: string;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true }, 
    points: { type: Number, required: true },
    rank: { type: Number, required: false },
    email: { type: String, required: true },
    auth0Id: { type: String, required: true },
});
export const User = mongoose.model<IUser>('User', userSchema);

