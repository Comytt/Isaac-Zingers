const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Your GitHub token and repo details
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'yourusername';  // Replace with your GitHub username
const REPO_NAME = 'yourrepository'; // Replace with your GitHub repository name
const COUNTER_FILE_PATH = 'counter.json';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to fetch the current zinger count
app.get('/get-counter', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${COUNTER_FILE_PATH}`, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        const counterData = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf-8'));
        res.json(counterData);
    } catch (error) {
        console.error("Error fetching zinger count:", error);
        res.status(500).json({ message: 'Error fetching zinger count.' });
    }
});

// Endpoint to update the zinger count
app.post('/update-zinger', async (req, res) => {
    if (!req.body.zingerCount) {
        return res.status(400).json({ success: false, message: 'Invalid zinger count.' });
    }

    const newZingerCount = req.body.zingerCount;

    try {
        // Fetch the current counter file from GitHub
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${COUNTER_FILE_PATH}`, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        // Parse the current counter data
        const counterData = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf-8'));
        counterData.zingers = newZingerCount;

        // Update the counter file with the new zinger count
        const updatedContent = Buffer.from(JSON.stringify(counterData)).toString('base64');

        await axios.put(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${COUNTER_FILE_PATH}`, {
            message: `Update zinger count to ${newZingerCount}`,
            content: updatedContent,
            sha: response.data.sha,
        }, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error("Error updating zinger count:", error);
        res.status(500).json({ success: false, message: 'Error updating zinger count.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
