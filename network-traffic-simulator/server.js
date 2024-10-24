const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');  // Import fs module for file operations

const app = express();
const PORT = 5000;

app.use(cors());

// Route to get network traffic data from the Python service
app.get('/api/traffic', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/traffic');
        const trafficData = response.data;

        // Save data to a JSON file
        fs.writeFile('traffic_data.json', JSON.stringify(trafficData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Data saved to traffic_data.json');
            }
        });

        res.json(trafficData);
    } catch (error) {
        console.error('Error fetching network traffic:', error.message);
        console.error('Error details:', error.response ? error.response.data : error);
        res.status(500).json({ error: 'Failed to fetch network traffic data' });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js server is running on http://localhost:${PORT}`);
});
