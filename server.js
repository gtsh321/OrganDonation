const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const Routes = require('./routes/routing');
const app = express();

// MySQL Database Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'express_db',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to MySQL Database');
//   }
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

// Render the Login Form
app.use('/', Routes.routes);


  


// // Route to Handle Form Submission
// app.post('/register', (req, res) => {
//   const {
//     adharnumber,
//     fullname,
//     birthdate,
//     gender,
//     address,
//     contact,
//     blood_type,
//     medical_history,
//     consent,
//     relationname,
//     relationship,
//     contactrelation,
//     consent_relation,
//   } = req.body;

//   const sql = `INSERT INTO donor (adharnumber, fullname, birthdate, gender, address, contact, blood_type, medical_history, consent, relationname, relationship, contactrelation, consent_relation)
//                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     adharnumber,
//     fullname,
//     birthdate,
//     gender,
//     address,
//     contact,
//     blood_type,
//     medical_history,
//     consent ? 1 : 0,
//     relationname,
//     relationship,
//     contactrelation,
//     consent_relation ? 1 : 0,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       res.status(500).send('Database insertion failed');
//     } else {
//       console.log('Data inserted successfully:', result);
//       res.send('Registration Successful!');
//     }
//   });
// });

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
