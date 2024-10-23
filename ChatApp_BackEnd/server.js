const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { mainDBConnection, archiveDBConnection } = require("./configuration/db"); // No need to call these as functions
const { swaggerUi, swaggerSpec } = require("./swagger");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, "../messageboard/build")));
// Routes
const authRouter = require("./routes/authRouter");
app.use("/api/auth", authRouter);

const channelRouter = require("./routes/channelListRoute");
app.use("/api/channels", channelRouter);

const messageRouter = require("./routes/messagesRoute");
app.use("/api/messages", messageRouter);

const archiveRouter = require("./routes/archiveRoute");
app.use("/api/archive", archiveRouter);

// Add this route to your server
app.get("/api/init", (req, res) => {
  console.log("Initializing API Links"); // This should appear in your logs
  res.json({
    message: "hello",
    links: {
      registerUser: "/api/auth/users",
      loginUser: "/api/auth/login",
      allChannels: "/api/channels/channels",
    },
    schemas: {
      registerUser: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          username: { type: "string" },
          password: { type: "string", format: "password" },
        },
        required: ["email", "username", "password"],
      },
      loginUser: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
        required: ["email", "password"],
      },
    },
  });
});

console.log(`Swagger UI available at http://localhost:3001/api-docs`);

// Start server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../messageboard/build/index.html"));
});

module.exports = app;
