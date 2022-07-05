const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
};

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("Up and running");
});

const authRoute = require("./routes/auth");

app.use("/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server is up and running at port ${PORT}`));
