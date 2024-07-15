import Basket from "./Basket.js";
import BasketProduct from "./BasketProduct.js";
import Composition from "./Composition.js";
import Order from "./Order.js";
import Product from "./Product.js";
import Type from "./Type.js";
import User from "./User.js";
import UserInfo from "./UserInfo.js";



User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasOne(Composition);
Composition.belongsTo(Product);

Type.hasMany(Product);
Product.belongsTo(Type);

User.hasMany(Order);
Order.belongsTo(User);

Basket.hasMany(Order);
Order.belongsTo(Basket);

export {
    User,
    Basket,
    Composition,
    BasketProduct,
    Order,
    Product,
    Type,
    UserInfo
}