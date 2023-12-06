"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const vitest_1 = require("vitest");
const knex_1 = __importDefault(require("knex"));
const db = __importStar(require("./cart"));
const knexfile_1 = __importDefault(require("./knexfile"));
const testDb = (0, knex_1.default)(knexfile_1.default.test);
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testDb.migrate.latest();
}));
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testDb.seed.run();
}));
(0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testDb.destroy();
}));
(0, vitest_1.describe)('getCartById', () => {
    (0, vitest_1.it)('has the correct length', () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield db.getCartById('a0', testDb);
        (0, vitest_1.expect)(cart).toHaveLength(4);
    }));
    (0, vitest_1.it)('first product has correct name', () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield db.getCartById('a0', testDb);
        (0, vitest_1.expect)(cart[0].name).toBe('Cavendish');
    }));
    (0, vitest_1.it)('first product has correct quantity', () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield db.getCartById('a0', testDb);
        (0, vitest_1.expect)(cart[0].quantity).toBe(1);
    }));
});
(0, vitest_1.describe)('addToCartById', () => {
    (0, vitest_1.it)('adds an item to cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = {
            userId: 'a0',
            productId: 6,
            quantity: 2,
        };
        yield db.addToCartById(test, testDb);
        const [cartItems] = yield testDb('cart').where({
            user_id: test.userId,
            product_id: test.productId,
            quantity: test.quantity,
        });
        (0, vitest_1.expect)(cartItems.user_id).toBe(test.userId);
        (0, vitest_1.expect)(cartItems.product_id).toBe(test.productId);
        (0, vitest_1.expect)(cartItems.quantity).toBe(test.quantity);
    }));
});
(0, vitest_1.describe)('updateCartItemQuantityByProductId', () => {
    (0, vitest_1.it)('updates quantity for an item in cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = {
            userId: 'a0',
            productId: 3,
            quantity: 4,
        };
        yield db.updateCartItemQuantityByProductId(test, testDb);
        const [updateItem] = yield testDb('cart').where({
            user_id: test.userId,
            product_id: test.productId,
            quantity: test.quantity,
        });
        (0, vitest_1.expect)(updateItem.user_id).toBe(test.userId);
        (0, vitest_1.expect)(updateItem.product_id).toBe(test.productId);
        (0, vitest_1.expect)(updateItem.quantity).toBe(test.quantity);
    }));
});
(0, vitest_1.describe)('clearCart', () => {
    (0, vitest_1.it)('clears the cart for a given user', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = 'a0';
        yield db.clearCart(test, testDb);
        const clearedCart = yield testDb('cart').where('user_id', test);
        (0, vitest_1.expect)(clearedCart).toHaveLength(0);
    }));
});
(0, vitest_1.describe)('removeCartItemByProductId', () => {
    (0, vitest_1.it)("clears a given item from a user's cart", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = { userId: 'a0', productId: 3 };
        yield db.removeCartItemByProductId(test, testDb);
        const clearedItem = yield testDb('cart')
            .where('user_id', test.userId)
            .andWhere('product_id', test.productId);
        (0, vitest_1.expect)(clearedItem).toHaveLength(0);
    }));
});
