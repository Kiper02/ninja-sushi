import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Type from "./Type.js";


const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    weight: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    type_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Type, key: 'id'}},
})

export default Product;