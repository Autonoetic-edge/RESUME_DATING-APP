import express, { Request, Response, Router } from 'express';
import htmlPdf from 'html-pdf-node';
import userModel from '../model/user.model';

interface EmailParams {
    email: string;
}

const router: Router = express.Router();

// GET /api/generate-pdf/:email
router.get('/generate-pdf/:email', async (req: Request<EmailParams>, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "No resume analysis found for this email." });
            return;
        }

        // Create HTML content for the PDF
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .section { margin-bottom: 20px; }
                        .score { font-size: 24px; color: #2c3e50; }
                        .breakdown { margin: 20px 0; }
                        .skill { color: #e74c3c; }
                    </style>
                </head>
                <body>
                    <h1>Resume Analysis Report</h1>
                    <div class="section">
                        <h2>Candidate: ${user.name}</h2>
                        <p>Email: ${user.email}</p>
                    </div>
                    <div class="section">
                        <h2>Overall Score</h2>
                        <div class="score">${user.score}%</div>
                    </div>
                    <div class="section">
                        <h2>Breakdown</h2>
                        <div class="breakdown">
                            ${Object.entries(user.breakdown).map(([key, value]) => 
                                `<p><strong>${key}:</strong> ${value}%</p>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="section">
                        <h2>Missing Skills</h2>
                        <ul>
                            ${user.missingSkills.map((skill: string) => 
                                `<li class="skill">${skill}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="section">
                        <h2>Resume Evaluation</h2>
                        <p>${user.evaluationOfResume}</p>
                    </div>
                    <div class="section">
                        <h2>Mentorship Recommendations</h2>
                        <p>${user.mentorship}</p>
                    </div>
                    <div class="section">
                        <h2>Cover Letter</h2>
                        <p>${user.coverLetter}</p>
                    </div>
                </body>
            </html>
        `;

        // Generate PDF
        const options = { format: 'A4' };
        const file = { content: htmlContent };
        
        htmlPdf.generatePdf(file, options)
            .then(pdfBuffer => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=resume-analysis-${user.email}.pdf`);
                res.send(pdfBuffer);
            })
            .catch(error => {
                console.error('Error generating PDF:', error);
                res.status(500).json({ error: 'Failed to generate PDF' });
            });

    } catch (error) {
        console.error('Error in PDF generation:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});

export default router; 