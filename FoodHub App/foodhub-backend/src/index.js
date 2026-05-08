const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://10.10.32.201:${PORT}`);
});