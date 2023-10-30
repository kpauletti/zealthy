import { type Sequelize, DataTypes } from "sequelize";
import { BaseModel } from "./_basemodel";
import { User } from "./user";

export class Ticket extends BaseModel<Ticket> {
  static TABLENAME = "tickets" as const;
  declare user_id: number;
  declare status: "new" | "in_progress" | "resolved";
  declare description: string;
  declare photo_url: string | null;
  declare resolution: string | null;

  static setup(sequelize: Sequelize) {
    Ticket.init(
      {
        ...BaseModel.attributes(),
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("new", "in_progress", "resolved"),
          allowNull: false,
          defaultValue: "new",
        },
        photo_url: {
          type: DataTypes.STRING,
        },
        resolution: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: Ticket.TABLENAME,
      }
    );
  }

  static setupAssociations() {
    Ticket.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}
