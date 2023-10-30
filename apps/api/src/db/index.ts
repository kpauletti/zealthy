import { Sequelize } from "sequelize";
import { env } from "../config/env";
import { User } from "./models/user";
import { Ticket } from "./models/ticket";
import { getMigrator } from "./umzug";

const models = [User, Ticket];

export const db = {} as { sequelize: Sequelize };

export async function initDB() {
  const sequelize = new Sequelize({
    //Well use sqlite for now, but this can be changed to any other database
    storage: "./db.sqlite",
    dialect: "sqlite",
    logging: env.NODE_ENV === "development" ? console.log : false,
  });

  try {
    const migrator = await getMigrator(sequelize);
    await migrator.up();

    for (const model of models) {
      model.setup(sequelize);
    }

    for (const model of models) {
      model.setupAssociations();
    }

    db.sequelize = sequelize;

    await sequelize.authenticate();

    console.log("Database connection successful.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error(error);
  }
}
