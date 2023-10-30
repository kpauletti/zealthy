import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, QueryInterface } from "sequelize";

let migrator: Umzug<QueryInterface> | undefined;

export async function getMigrator(sequelize: Sequelize) {
    if (!migrator) {
        migrator = new Umzug({
            migrations: {
                glob: ["migrations/*.js", { cwd: __dirname }],
            },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({
                sequelize,
            }),
            logger: console,
        });
    }
    return migrator;
}

export type Migration = typeof migrator._types.migration;
