"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
const connection_1 = __importDefault(require("./connection"));
function getProductById(id, db = connection_1.default) {
    return db('products')
        .where('id', id)
        .select('id', 'name', 'price', 'description', 'img_src as imgSrc', 'calorie_count as calorieCount', 'weight', 'taste_profile as tasteProfile', 'origin', 'random_fact as randomFact')
        .first();
}
exports.getProductById = getProductById;
