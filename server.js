const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', schoolRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
