const express = require('express');
const Airtable = require('airtable');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, this is your Knowledge Base Editor!');
});

// Replace 'YOUR_API_KEY' and 'YOUR_BASE_ID' with your actual Airtable API key and base ID
const base = new Airtable({ apiKey: 'patbWbDMVQWxvbnbz.5a2c8c01191c461a1bcec9599c8d97aa697b18c5f63dd0edc3283f3948933d1b' }).base('appcokJKIHCJbmZRC');

app.get('/get-user-record', (req, res) => {
    const userName = req.query.userName;

    base('Knowledge Base').select({
        filterByFormula: `{Name of KB} = '${userName}'`,
        maxRecords: 1
    }).firstPage((err, records) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (records.length > 0) {
            const userRecordId = records[0].id;
            console.log('User Record ID:', userRecordId);
            res.json({ userRecordId });
        } else {
            console.log('User not found');
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
