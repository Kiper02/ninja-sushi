import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Basket from "./Basket.js";


const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    isDilivery: {type: DataTypes.BOOLEAN, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: true},
    hous: {type: DataTypes.INTEGER, allowNull: true},
    entrance: {type: DataTypes.INTEGER, allowNull: true},
    floor: {type: DataTypes.INTEGER, allowNull: true},
    leave_under_the_door: {type: DataTypes.BOOLEAN, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
    comment_on_the_order: {type: DataTypes.STRING, allowNull: true},
    comment_on_the_courier: {type: DataTypes.STRING, allowNull: true},
    payment: {type: DataTypes.STRING, allowNull: false},
    total_amount: {type: DataTypes.INTEGER, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
    basket_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Basket, key: 'id'}}
})

export default Order;