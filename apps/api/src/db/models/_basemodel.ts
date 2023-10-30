import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { type BaseModel as BM } from "../../types/models/basemodel";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class BaseModel<T extends Model<any, any>>
  extends Model<InferAttributes<T>, InferCreationAttributes<T>>
  implements BM
{
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: Date | null;

  static attributes() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    };
  }
}
