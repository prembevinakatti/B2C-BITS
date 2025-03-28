const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const AccessRouter=require("./routes/accesRoute")
const ServiceRoute=require("./routes/servicesRoute")
const connectDB = require("./config/database");
const serviceAccount=require("./firebase-admin-config.json")
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://b2c-bits.onrender.com", // Adjust this to the correct frontend URL
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Add all allowed HTTP methods
  credentials: true, // If you're using cookies or credentials
};
app.use(cors(corsOptions));
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use("/api/user", userRoute); // Your API routes
app.use("/api/accesscontrol",AccessRouter)
app.use("/api/services",ServiceRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
