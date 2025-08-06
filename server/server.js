require('dotenv').config();
const app = require('./app');
const dbConnection = require('./config/dbConnection');

const PORT = process.env.PORT || 5000;

// Connect DB
dbConnection();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

