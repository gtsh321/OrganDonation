const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => res.render('homepage'));
router.get('/login', (req, res) => res.render('login'));
router.get('/recipientForm', (req, res) => res.render('recipientForm'));
router.get('/newDonorRegister', (req, res) => res.render('newDonorRegister'));
router.get('/donorFinalConfirmation', (req, res) => res.render('donorFinalConfirmation'));
router.post('/register', (req, res) => {
    console.log(req.body);  // Debugging to ensure data is received correctly
  
    const {
      adharnumber,
      fullname,
      birthdate,
      gender,
      address,
      contact,
      blood_type,
      medical_history,
      consent,
      relationname,
      relationship,
      contactrelation,
      consent_relation,
    } = req.body;
  
    // SQL query to insert form data into the database
    const sql = `INSERT INTO Donor (adharnumber, fullname, birthdate, gender, address, contact, blood_type, medical_history, consent, relationname, relationship, contactrelation, consent_relation)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Prepare the values to be inserted
    const values = [
      adharnumber,
      fullname,
      birthdate,
      gender,
      address,
      contact,
      blood_type,
      medical_history,
      consent === 'yes' ? 1 : 0,
      relationname,
      relationship,
      contactrelation,
      consent_relation === 'yes' ? 1 : 0,
    ];
  
    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Database insertion failed');
      } else {
        console.log('Data inserted successfully:', result);
        res.send('Registration Successful!');
      }
    });
  });
  



module.exports = {
    routes: router
}