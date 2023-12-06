"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItemByProductId = exports.clearCart = exports.updateCartItemQuantityByProductId = exports.addToCartById = exports.getCartById = void 0;
const connection_1 = __importDefault(require("./connection"));
function getCartById(id, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return db('cart')
            .join('products', 'cart.product_id', 'products.id')
            .where('cart.user_id', id)
            .select('cart.user_id as id', 'products.name as name', 'products.id as productId', 'products.price as price', 'cart.quantity as quantity', 'products.img_src as imgSrc', 'products.weight as weight');
    });
}
exports.getCartById = getCartById;
function addToCartById(newItem, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingItem = yield db('cart')
            .where('user_id', newItem.userId)
            .andWhere('product_id', newItem.productId)
            .first();
        if (existingItem) {
            return updateCartItemQuantityByProductId(Object.assign(Object.assign({}, newItem), { quantity: existingItem.quantity + newItem.quantity }), db);
        }
        else {
            return db('cart').insert({
                user_id: newItem.userId,
                product_id: newItem.productId,
                quantity: newItem.quantity,
            });
        }
    });
}
exports.addToCartById = addToCartById;
function updateCartItemQuantityByProductId(newItem, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return db('cart')
            .where('user_id', newItem.userId)
            .andWhere('product_id', newItem.productId)
            .update('quantity', newItem.quantity);
    });
}
exports.updateCartItemQuantityByProductId = updateCartItemQuantityByProductId;
function clearCart(userId, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return db('cart').where('user_id', userId).del();
    });
}
exports.clearCart = clearCart;
function removeCartItemByProductId(deleteItem, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return db('cart')
            .where('user_id', deleteItem.userId)
            .andWhere('product_id', deleteItem.productId)
            .del();
    });
}
exports.removeCartItemByProductId = removeCartItemByProductId;
