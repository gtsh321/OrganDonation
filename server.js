const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Routes = require('./routes/routing');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

// Render the Login Form
app.use('/', Routes.routes);


// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
