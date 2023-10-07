const express = require("express");
const apicache = require("apicache");
require("dotenv").config();

const v1AuthRouter = require("./v1/routes/authRoutes");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");
const cache = apicache.middleware;
const { validarJWT } = require("./middlewares/validarJWT");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cache("2 minutes"));

app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/workouts", validarJWT, v1WorkoutRouter);
app.use("/api/v1/records", validarJWT, v1RecordRouter);
app.use("/api/v1/members", validarJWT, v1MemberRouter);

app.listen(PORT, () => {
	console.log(`🚀 API is listening on port ${PORT}`);
});
