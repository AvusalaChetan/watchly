import { handleAsNodeRequest } from "cloudflare:node";
import app from "./src/app/app.js";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";
 
const server = app.listen(config.PORT);
let dbPromise: Promise<void> | null = null;

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    dbPromise ??= connectDB();
    await dbPromise;

    return handleAsNodeRequest({port: 8080}, request, env, ctx);
  },
};
