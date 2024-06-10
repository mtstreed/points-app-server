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


export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const reqBody = req.body;
        const updatedUser: IUser = reqBody as IUser;

        const dbUser = await User.findById(updatedUser._id);
        if (dbUser) {
            dbUser.points = updatedUser.points;
            dbUser.rank = updatedUser.rank;
            const savedUser = await dbUser.save();
            res.json(savedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

        // const updatedUsers: IUser[] = reqBody as IUser[];

        // const userPromises = updatedUsers.map(async (user) => {
        //     const dbUser: IUser | null = await User.findById(user._id);
        //     if (dbUser) {
        //         dbUser.points = user.points;
        //         dbUser.rank = user.rank;
        //         return dbUser.save();
        //     } else {
        //         return;
        //     }
        // });
        // const savedUsers = await Promise.all(userPromises);
        // res.json(savedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Users: ' + JSON.stringify(error) });
    }
}


export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const reqBody = req.body;
        const usersInfo: IUser[] = reqBody as IUser[];
        const userPromises = usersInfo.map(async (user) => {
            const newUser = new User(user);
            return newUser.save();
        });
        const savedUsers = await Promise.all(userPromises);
        res.json(savedUsers);
        console.log('Users created: ' + JSON.stringify(savedUsers));
    } catch (error) {
        res.status(500).json({ message: 'Error creating User: ' + JSON.stringify(error) });
    }
}