const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const server = http.createServer(app);

//  CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      const allowOrigins = [
        "http://localhost:8000",
        "http://localhost:4200",
        "http://127.0.0.1:8000",
        "http://www.genius.utils.com",
      ];

      if (!origin || allowOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-signin-type"],
  })
);


// middlewares
app.use(express.json()); // application/json --body parser
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded --body parser

// static path
app.use(express.static(path.join(__dirname, "public")));

// routers
const authRoutes = require("./src/routes/auth.routes");
const commonRoutes = require("./src/routes/common.routes");
const datetimeRoutes = require("./src/routes/datetime.routes");
const mediaRoutes = require("./src/routes/media.routes");

// routes
app.use("/utils/auth", authRoutes);
app.use("/utils/common", commonRoutes);
app.use("/utils/datetime", datetimeRoutes);
app.use("/utils/media", mediaRoutes);

// open API swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// default route
app.use("/", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });

// server setup
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
