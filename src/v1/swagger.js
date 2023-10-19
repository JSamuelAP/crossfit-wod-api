import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./docs/index.js";

// Function to setup our docs
const swaggerDocs = (app, port) => {
	// Route-Handler to visit our docs
	app.use("/api/v1/docs", serve, setup(swaggerSpec));
	// Make our docs in JSON format available
	app.get("/api/v1/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
	console.log(
		`📄 Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
	);
};

export default swaggerDocs;
