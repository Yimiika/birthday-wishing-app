const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const runBirthdayJob = require("./cron/birthdayCron");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
runBirthdayJob();

app.get("/wake-up", (req, res) => {
  console.log("Wake-up ping received");
  res.status(200).send("Awake!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
