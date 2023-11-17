import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import v1AuthRouter from "./v1/routes/authRoutes.js";
import v1WorkoutRouter from "./v1/routes/workoutRoutes.js";
import v1RecordRouter from "./v1/routes/recordRoutes.js";
import v1MemberRouter from "./v1/routes/memberRoutes.js";
import { validarJWT } from "./middlewares/validarJWT.js";
import V1SwaggerDocs from "./v1/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/workouts", validarJWT, v1WorkoutRouter);
app.use("/api/v1/records", validarJWT, v1RecordRouter);
app.use("/api/v1/members", validarJWT, v1MemberRouter);

app.listen(PORT, () => {
	console.log(`🚀 API is listening on port ${PORT}`);
	V1SwaggerDocs(app, PORT);
});
