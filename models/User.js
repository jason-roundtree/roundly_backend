const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        msg: () => "Invalid email format",
      },
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    //   password: {
    //     type: DataTypes.STRING
    //   }
  },
  {
    sequelize,
    modelName: "user",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = User;
