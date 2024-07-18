import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.JSON, allowNull: false, defaultValue: ['User']},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})

export default User;