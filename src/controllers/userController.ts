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
    try {
        const userId = req.params.id;
        const user = await User.findOne({ auth0Id: userId });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// TODO update all user fields?
export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const reqBody = req.body;
        
        const updatedUser: IUser = reqBody as IUser;
        const dbUser = await User.findOne({ auth0Id: userId });
        if (dbUser) {
            dbUser.points = updatedUser.points;
            dbUser.rank = updatedUser.rank;
            const savedUser = await dbUser.save();
            res.json(savedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

        // Code to bulk update users or create a user if not found.
        // const updatedUsers: IUser[] = reqBody as IUser[];
        // // TODO this could be more efficient; not every user may need their points or rank updated.
        // const userPromises = updatedUsers.map(async (user) => {
        //     const dbUser: IUser | null = await User.findById(user._id);
        //     if (dbUser) {
        //         dbUser.points = user.points;
        //         dbUser.rank = user.rank;
        //         return dbUser.save();
        //     } else {
        //         const newUser = new User(user);
        //         return newUser.save();
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
        const userInfo: IUser = reqBody as IUser;
        const newUser = new User(userInfo);
        const savedUser = await newUser.save();
        res.json(savedUser);
        console.log('User created: ' + JSON.stringify(savedUser));
    } catch (error) {
        res.status(500).json({ message: 'Error creating User: ' + JSON.stringify(error) });
    }
}