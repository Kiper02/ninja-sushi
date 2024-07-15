import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Basket from "./Basket.js";
import Product from "./Product.js";


const BasketProduct = sequelize.define('BasketProduct', {
    id: {type: DataTypes.INTEGER, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    basket_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Basket, key: 'id'}},
    product_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Product, key: 'id'}}
})

export default BasketProduct;