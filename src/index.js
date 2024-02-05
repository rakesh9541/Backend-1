const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
