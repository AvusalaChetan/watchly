import app from "./app/app.js";
import { connectDB } from "./config/db.js";

await connectDB();

app.listen(8080, () => console.log("server is running"));
