import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Product from "./Product.js";


const Composition = sequelize.define('Composition', {
    id: {type: DataTypes.INTEGER, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    product_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Product, key: 'id'}}
})

export default Composition;