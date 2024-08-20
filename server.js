const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./configs/db");

// Initialize Express app
const app = express();
// Connect to the database
connectDB();


// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Import and use routes
const customerRoute = require("./routes/customer.routes");
const deliveryRoute = require("./routes/delivery.routes");

app.use("/customer", customerRoute);
app.use("/delivery", deliveryRoute);

// Basic route for the root URL
app.use("/", (req, res) => {
  res.send("You just hit the business management server!");
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if no PORT is specified
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
