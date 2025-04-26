import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./Routes/bookRoute.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// To handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for handling CORS POLICY
app.use(cors());

// Middleware to parse incoming JSON
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/books', bookRoute);

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});
