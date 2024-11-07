const express = require("express");
const { google } = require('googleapis');
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({
  // origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"],
  origin: true,
  credentials: true
}))


const auth = new google.auth.GoogleAuth({
  credentials: {
    "type": "service_account",
    "project_id": "my-project1-399109",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": "108858696902478049072",
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/event-api%40my-project1-399109.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});
const sheets = google.sheets({ version: 'v4', auth });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Test"
  })
})

app.get('/api/sheet-data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A1:Z1000',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No data found in the spreadsheet' });
    }

    // Extracting headers
    const headers = rows[0];

    const formattedData = rows.slice(1).map(row => {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row[index] || ''; // Handle missing values
      });
      return rowObject;
    });
    console.log(formattedData);

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ error: 'Error fetching sheet data' });
  }
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});