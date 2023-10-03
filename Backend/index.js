const express = require("express");
const connectDB = require("./config/connection");
require("dotenv").config();
const app = express();

//conect db
connectDB();
app.use(express.json());
//route
app.use("/api/auth", require("./routes/authRoutes"));
app.use(express.json());
//route
app.use("/api/post", require("./routes/postRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

const port = 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
