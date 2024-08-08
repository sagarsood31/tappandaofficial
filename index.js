import express from 'express';
import connectDB from './utils/db.js';
import gameStateRoutes from './routes/gameStateRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/gameState', gameStateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
