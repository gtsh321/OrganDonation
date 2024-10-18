const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => res.render("homepage"));
router.get("/login", (req, res) => res.render("login"));
router.get("/recipientForm", (req, res) => res.render("recipientForm"));
router.get("/newDonorRegister", (req, res) => res.render("newDonorRegister"));

router.post("/register", (req, res) => {
  console.log(req.body); // Debugging to ensure data is received correctly

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
      console.error("Error inserting data:", err);
      res.status(500).send("Database insertion failed");
    } else {
      console.log("Data inserted successfully:", result);
      res.send("Registration Successful!");
    }
  });
});

//   router.post('/registerRecipient', (req, res) => {
//     console.log(req.body);  // For debugging

//     const {
//         adharnumber,
//         fullname,
//         weight,
//         blood_group,
//         birthdate,
//         organs,
//         urgency
//     } = req.body;

//     // Ensure organs are handled properly (comma-separated values)
//     const organs_needed = Array.isArray(organs) ? organs.join(',') : organs;

//     // SQL query to insert form data into the database
//     const sql = `
//         INSERT INTO Recipient (adharnumber, fullname, weight, blood_group, birthdate, organs_needed, urgency_level)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     // Prepare the values for insertion
//     const values = [
//         adharnumber,
//         fullname,
//         weight,
//         blood_group,
//         birthdate,
//         organs_needed,
//         urgency
//     ];

//     // Execute the SQL query
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).send('Database insertion failed');
//         } else {
//             console.log('Recipient data inserted successfully:', result);
//             res.send('Recipient Registration Successful!');
//         }
//     });
// });

router.post("/authenticateDonor", (req, res) => {
  const { adharnumber } = req.body;

  const sql = "SELECT * FROM Donor WHERE adharnumber = ?";
  db.query(sql, [adharnumber], (err, result) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Database query failed");
    } else if (result.length > 0) {
      // Aadhar number found, store it in the session
      req.session.adharnumber = adharnumber;
      console.log("session stores =", req.session.adharnumber);
      res.render("donorFinalConfirmation", { donor: result[0] }); // Redirect to the confirmation page
    } else {
      // Aadhar number not found, render login page with error message
      res.render("login", {
        errorMessage: "Invalid Aadhar Number. Please try again.",
      });
    }
  });
});

router.post("/submitDonorConfirmation", (req, res) => {
  const {
    weight,
    blood_group,
    hospital,
    time_of_death,
    organs,
    consent_donor,
    consent_family,
  } = req.body;
  const adharnumber = req.session.adharnumber; // Fetch aadhar number from session

  if (!adharnumber) {
    return res.status(403).send("Unauthorized access. Please log in first.");
  }

  const sql = `UPDATE Donor 
                 SET weight = ?, blood_group = ?, hospital_name = ?, time_of_death = ?, organs = ?, consent_donor = ?, consent_family = ? 
                 WHERE adharnumber = ?`;

  const values = [
    weight,
    blood_group,
    hospital,
    time_of_death,
    organs.toString(),
    consent_donor === "yes" ? 1 : 0,
    consent_family === "yes" ? 1 : 0,
    adharnumber,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating donor details:", err);
      return res.status(500).send("Failed to update donor details");
    }
    res.send("Donor details successfully updated.");
  });
});

module.exports = {
  routes: router,
};
