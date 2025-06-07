import express, { Request, Response, Router, RequestHandler } from 'express';
import userModel from '../model/user.model';

interface EmailParams {
    email: string;
}

const router: Router = express.Router();

// POST /api/analyze-resume
const analyzeResumeHandler: RequestHandler = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const {
            name,
            email,
            score,
            breakdown,
            missingSkills,
            jd,
            evaluationOfResume,
            mentorship,
            coverLetter,
            job_Title,
            company_name
        } = req.body;

        // Check if user already exists with the same name and email
        console.log('Checking for existing user with email:', email, 'and name:', name);
        let user = await userModel.findOne({ email, name });
        console.log('Existing user found:', user ? 'Yes' : 'No');

        const currentDate = new Date();

        if (user) {
            // Update existing user
            console.log('Updating existing user...');
            user = await userModel.findOneAndUpdate(
                { email, name }, // Match both email and name
                {
                    score,
                    breakdown,
                    missingSkills,
                    jd,
                    evaluationOfResume,
                    mentorship,
                    coverLetter,
                    job_Title,
                    company_name,
                    date: currentDate,
                    updatedAt: currentDate
                },
                { new: true }
            );
            console.log('User updated successfully:', user);
        } else {
            // Create new user only if no matching name and email combination exists
            console.log('Creating new user...');
            user = new userModel({
                name,
                email,
                score,
                breakdown,
                missingSkills,
                jd,
                evaluationOfResume,
                mentorship,
                coverLetter,
                job_Title,
                company_name,
                date: currentDate,
                createdAt: currentDate,
                updatedAt: currentDate
            });
            await user.save();
            console.log('New user created successfully:', user);
        }

        if (!user) {
            throw new Error('Failed to create or update user');
        }

        res.status(201).json({ 
            message: user.updatedAt === user.createdAt ? 'New resume analysis created' : 'Existing resume analysis updated', 
            user,
            timestamp: {
                created: user.createdAt,
                updated: user.updatedAt,
                analysisDate: user.date
            }
        });
    } catch (error) {
        console.error('Error saving resume analysis:', error);
        res.status(500).json({ error: 'Failed to save resume analysis' });
    }
};

// GET /api/resume-analysis/:email
const getResumeAnalysisHandler: RequestHandler<EmailParams> = async (req, res) => {
    try {
        const { email } = req.params;
        const { name } = req.query;
        
        console.log('Searching for analysis with email:', email, 'and name:', name);

        // Build query based on provided parameters
        const query: any = { email };
        if (name) {
            query.name = name;
        }

        // Find the latest result by sorting by creation date
        const user = await userModel.findOne(query)
            .sort({ createdAt: -1 })
            .exec();

        console.log('Query used:', query);
        console.log('Found user:', user ? {
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            analysisDate: user.date
        } : 'No user found');

        if (!user) {
            console.log('No user found with email:', email);
            res.status(404).json({ 
                message: "No resume analysis found for this email.",
                email,
                name: name || 'not provided'
            });
            return;
        }

        res.status(200).json({
            message: "Resume analysis fetched successfully.",
            data: user,
            timestamp: {
                created: user.createdAt,
                updated: user.updatedAt,
                analysisDate: user.date
            }
        });

    } catch (error) {
        console.error('Error in getResumeAnalysisHandler:', error);
        res.status(500).json({
            message: "Error while fetching resume analysis.",
            error
        });
    }
};

router.post('/analyze-resume', analyzeResumeHandler);
router.get('/resume-analysis/:email', getResumeAnalysisHandler);

export default router;
