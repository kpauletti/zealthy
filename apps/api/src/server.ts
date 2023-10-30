import _debug from "debug";
import app from "./app";
import { initDB, db } from "./db";
import { env } from "./config/env";

const debug = _debug("app:server");

const server = app.listen(env.PORT, async () => {
    await initDB();
    console.log(`Server started on port ${env.PORT}`);
});

/**
 * Graceful shutdown
 */
process.on("SIGTERM", () => {
    debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        debug("HTTP server closed");
    });
    db.sequelize.close().then(() => {
        debug("Database connection closed");
    });
});
