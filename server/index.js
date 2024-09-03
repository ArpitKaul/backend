import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define your routes
app.use("/api/v1", routes);

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected");
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => { 
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit the process with failure code
    });
