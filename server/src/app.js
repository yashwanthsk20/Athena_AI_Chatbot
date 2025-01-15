import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.get("/ping", (req, res) => {
//   res.send("Pong!");
// });

app.use("/", indexRouter);

// app.all("*", (req, res) => {
//   res.send("<h2>Not found!</h2>");
// });

export default app;
