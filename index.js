// index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import gameStateRouter from './routes/gameState.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

app.use('/gameState', gameStateRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
