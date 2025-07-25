import express from "express";
import cors from "cors";

import quizRoutes from "./routes/quiz-routes";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});

app.get("/ping", (req, res) => {
	res.send("Pong");
});

app.use("/api", quizRoutes);
