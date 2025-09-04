require("dotenv").config();
const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());

// port to server the api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Bind to port to start server
app.listen(process.env.PORT, () => {
  console.log(`Express server started at port ${process.env.PORT}`);
});
