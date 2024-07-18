import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";


const UserInfo = sequelize.define('UserInfo', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING, allowNull: true},
    user_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
})
 
export default UserInfo;