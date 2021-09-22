const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io")
const io = socket(server);
const PORT = process.env.PORT || 5000;



server.listen(PORT, () => console.log(`Server started on port ${PORT}`));