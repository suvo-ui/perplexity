import "dotenv/config";
import app from "./src/app.js";
import dns from "dns";
import connectDB from "./src/config/db.js";
import { testAi } from "./src/services/ai.service.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

// testAi();
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
