import { initDB, db } from ".";
import { getMigrator } from "./umzug";

/**
 * npm run migrator
 */
async function main() {
    await initDB();
    const migrator = await getMigrator(db.sequelize);
    await migrator.runAsCLI();
    process.exit(0);
}

main();
