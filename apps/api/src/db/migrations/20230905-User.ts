import { DataTypes } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.bulkInsert("users", [
    {
      id: 1,
      name: "Admin",
      email: "admin@test.com",
      role: "admin",
      passwordHash: "$2b$10$dptWTPHo8zhn09UyerzZeOBddHEQTcfY9sO/0n5DYULAgxPXX7m/e",
    },
    {
      id: 2,
      name: "User",
      email: "user@test.com",
      role: "user",
      passwordHash: "$2b$10$dptWTPHo8zhn09UyerzZeOBddHEQTcfY9sO/0n5DYULAgxPXX7m/e",
    },
  ]);
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("users");
};
