import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    number_phone: {type: DataTypes.INTEGER, allowNull: false},
    role: {type: DataTypes.ARRAY, allowNull: false, defaultValue: ['User']}
})

export default User;