import express, { Request, Response } from 'express';
import userModel from '../model/user.model';

const router = express.Router();

// POST /api/users
router.post('/users', async (req: Request, res: Response) => {
    try {
        console.log("inside...");
        
        const {
            name,
            score,
            breakdown,
            missingSkills,
            jd,
            evaluationOfResume,
            mentorship,
            coverLetter
        } = req.body;

        console.log("req body is: ", req.body);
        

        const user = new userModel({
            name,
            score,
            breakdown,
            missingSkills,
            jd,
            evaluationOfResume,
            mentorship,
            coverLetter
        });

        console.log("created new user");
        

        await user.save();
        res.status(201).json({ message: 'User data saved successfully', user });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
});

router.get('/data/user', async (req: Request, res: Response): Promise<any> => {
    console.log("inside");
    
    try {
        const { email } = req.headers;

        if (!email || typeof email !== "string") {
            return res.status(400).json({ message: "Email query parameter is required." });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with the provided email." });
        }

        return res.status(200).json({
            message: "User data fetched successfully.",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching user data.",
            error
        });
    }
});

export default router;
