import { type Sequelize, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import { BaseModel } from "./_basemodel";
import { env } from "../../config/env";
import { Ticket } from "./ticket";

export class User extends BaseModel<User> {
  static TABLENAME = "users" as const;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare role: "admin" | "user";

  generateJWT() {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        role: this.role,
      },
      env.JWT_SECRET
    );
  }

  static async verifyJWT(token: string) {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
    };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return user;
  }

  static setup(sequelize: Sequelize) {
    User.init(
      {
        ...BaseModel.attributes(),
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "user"),
          allowNull: false,
          defaultValue: "user",
        },
      },
      {
        sequelize,
        tableName: User.TABLENAME,
      }
    );
  }

  static setupAssociations() {
    User.hasMany(Ticket, {
      foreignKey: "user_id",
      as: "tickets",
    });
  }
}
