const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./configs/db");
const { port } = require("./lib/constants");

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
const userRoute = require("./routes/user.routes");
const billingRoute = require("./routes/billing.routes");

app.use("/customer", customerRoute);
app.use("/delivery", deliveryRoute);
app.use("/user", userRoute);
app.use("/billing", billingRoute);

// Basic route for the root URL
app.use("/", (req, res) => {
  res.send("You just hit the business management server!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
