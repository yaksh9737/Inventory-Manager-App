const express = require('express');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const errorHandler = require('./middleware/errorMiddleware');
// In your server.js or app.js (Node.js)
const cors = require('cors');

require('dotenv').config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
