// db.js
const mongoose = require("mongoose");

// Connection URIs for your MongoDB Atlas databases
const mainDBUri =
  ""; // Main DB URI
const archiveDBUri =
  ""; // Archive DB URI

// Create connections
const mainDBConnection = mongoose.createConnection(mainDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
});

const archiveDBConnection = mongoose.createConnection(archiveDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
});

// Check connections
mainDBConnection.on("connected", () => {
  console.log("Connected to main database");
});
mainDBConnection.on("error", (err) => {
  console.error("Error connecting to main database:", err);
});

archiveDBConnection.on("connected", () => {
  console.log("Connected to archive database");
});
archiveDBConnection.on("error", (err) => {
  console.error("Error connecting to archive database:", err);
});

module.exports = {
  mainDBConnection,
  archiveDBConnection,
};
