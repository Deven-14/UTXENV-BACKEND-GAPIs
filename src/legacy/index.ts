import "dotenv/config"
// require("./config/database").connect();
import express from 'express';
// import {router as club_router} from "./src/routes/club_router"

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Working");
});

// app.use("/api", club_router);

app.listen(port, () => {
    console.log(`this log is working on ${port}`);
});