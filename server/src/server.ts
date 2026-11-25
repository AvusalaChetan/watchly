import {createServer} from "node:http";
import app from "./app/app.js";
import {config} from "./config/config.js";
import {connectDB} from "./config/db.js";
import socketServer from "./socket/socket.server.js";
import mongoose from "mongoose";
try {
  await connectDB();

  const httpServer = createServer(app);
  const ioServer = socketServer(httpServer);

  httpServer.listen(config.PORT, () =>
    console.log("server is running at 8080"),
  );

  httpServer.on("error", (error) => {
    console.error("HTTP server failed:", error);
    process.exit(1);
  });

  function shutdown() {
    httpServer.close(async () => {
      try {
        await mongoose.disconnect();
        process.exit(0);
      } catch (error) {
        console.error("Database shutdown failed:", (error as Error).message);
        process.exit(1);
      }
    });

    ioServer.close(async () => {
      try {
        await mongoose.disconnect();
        process.exit(0);
      } catch (error) {
        console.error("Database shutdown failed:", (error as Error).message);
        process.exit(1);
      }
    });

    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
} catch (error) {
  console.error("Server startup failed:", (error as Error).message);
  process.exit(1);
}
