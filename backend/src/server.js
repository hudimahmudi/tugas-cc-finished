require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

db.raw('SELECT 1')
  .then(() => console.log('Database connection established'))
  .catch((err) => console.error('Database connection failed:', err.message));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});