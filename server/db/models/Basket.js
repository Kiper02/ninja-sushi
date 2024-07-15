import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";


const Basket = sequelize.define('Basket', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    user_id: {type: DataTypes.INTEGER, references: {model: User, key: 'id'}}
}) 

export default Basket;