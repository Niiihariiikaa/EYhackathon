const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow React frontend to access this server

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'new',  // Use your MySQL credentials here
    password: 'rijul16',  // Use your MySQL credentials here
    database: 'callback_schedule'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API routes
// Get callbacks
app.get('/callbacks', (req, res) => {
    const today_date = new Date().toISOString().split('T')[0]; // Get current date

    db.query(`
        SELECT * 
        FROM callbacks 
        ORDER BY 
            ABS(DATEDIFF(date, ?)) ASC,  
            claim_amount DESC,  
            priority ASC, 
            date ASC,  
            time ASC
    `, [today_date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Schedule a new callback
app.post('/schedule', (req, res) => {
    const { name, phone, date, time, claim_amount } = req.body;
    const priority = claim_amount >= 10000 ? 1 : claim_amount >= 5000 ? 2 : 3;

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be 10 digits long.' });
    }

    db.query('INSERT INTO callbacks (name, phone, date, time, claim_amount, priority) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, phone, date, time, claim_amount, priority], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Callback scheduled successfully!' });
    });
});

// Mark callback as done
app.post('/mark_done/:id', (req, res) => {
    const callbackId = req.params.id;

    db.query('UPDATE callbacks SET status = "done" WHERE id = ?', [callbackId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        db.query('DELETE FROM callbacks WHERE id = ?', [callbackId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Callback marked as done.' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
