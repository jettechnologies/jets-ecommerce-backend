const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "E-commerce API",
    description: "Auto-generated swagger docs for e-commerce backend",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/account/*",
  "./routes/auth/*",
  "./routes/checkout/*",
  "./routes/shop/*",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated!");
  //   require("./index.js");
});
