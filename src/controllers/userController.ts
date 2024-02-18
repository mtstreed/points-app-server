import {Request, Response} from 'express'; // Do not confuse w/ regular typescript Request/Response types.
import {User, IUser } from '../models/userModel.js';


export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users: IUser[] = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export async function getUserById(req: Request, res: Response): Promise<void> {
    res.send('getUserById called');
}


export async function updateUsers(req: Request, res: Response): Promise<void> {
    try {
        const reqBody = req.body;
        const updatedUsers: IUser[] = reqBody as IUser[];

        const mapPromises = updatedUsers.map(async (user) => {
            const dbUser: IUser | null = await User.findById(user._id);
            if (dbUser) {
                dbUser.points = user.points;
                dbUser.rank = user.rank;
                return dbUser.save();
            } else {
                return;
            }
        });

        await Promise.all(mapPromises);
        res.json(updatedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Users: ' + JSON.stringify(error) });
    }
}