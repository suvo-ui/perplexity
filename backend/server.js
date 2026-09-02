import "dotenv/config";
import app from "./src/app.js";
import dns from "dns";
import connectDB from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);
initSocket(httpServer);

connectDB();
httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
