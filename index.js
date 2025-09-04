require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerDocs = require("./app/swagger"); // import swagger function

const app = express();

// Enable CORS globally
app.use(cors());

// middlewares, routes, etc...

// Mount Swagger Docs
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// require("dotenv").config();
// const app = require("./app");
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger-output.json");
// const cors = require("cors");

// // Enable CORS for all origins
// app.use(cors());

// // port to server the api-docs
// // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// const swaggerOptions = {
//   explorer: true,
//   swaggerOptions: {
//     validatorUrl: null,
//   },
// };

// app.use(
//   "/api-docs",
//   cors(),
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerFile, swaggerOptions)
// );

// // Bind to port to start server
// app.listen(process.env.PORT, () => {
//   console.log(`Express server started at port ${process.env.PORT}`);
// });
