import { handleAsNodeRequest } from "cloudflare:node";
import app from "./src/app/app.js";
import { connectDB } from "./src/config/db.js";

const server = app.listen(8080);
let dbPromise: Promise<void> | null = null;

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    dbPromise ??= connectDB().catch((e) => {
      dbPromise = null;
      throw e;
    });
    await dbPromise;
    return handleAsNodeRequest(8080, request);
  },
};
