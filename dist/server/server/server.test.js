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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./server"));
const shop = __importStar(require("./db/shop"));
const product = __importStar(require("./db/product"));
const cart = __importStar(require("./db/cart"));
const home = __importStar(require("./db/home"));
vitest_1.vi.mock('./db/shop');
vitest_1.vi.mock('./db/product');
vitest_1.vi.mock('./db/cart');
vitest_1.vi.mock('./db/home');
(0, vitest_1.beforeEach)(() => {
    vitest_1.vi.clearAllMocks();
});
//SHOP GET ROUTE SUCCESS
(0, vitest_1.describe)('GET /api/v1/shop', () => {
    const mockedProduct = [
        {
            id: 1,
            name: 'cavendish',
            price: 10,
            imgSrc: 'cavendish.png',
        },
    ];
    (0, vitest_1.it)('responds with correct data structure and values', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(shop.getAllProducts).mockResolvedValue(mockedProduct);
        const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/shop');
        const products = response.body;
        (0, vitest_1.expect)(products[0].id).toBe(1);
        (0, vitest_1.expect)(products[0].name).toBe('cavendish');
        (0, vitest_1.expect)(products[0].price).toBe(10);
        (0, vitest_1.expect)(products[0].imgSrc).toBe('cavendish.png');
    }));
});
//SHOP GET ROUTE FAIL
(0, vitest_1.describe)('GET /api/v1/shop', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(shop.getAllProducts).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/shop');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//PRODUCT GET ROUTE SUCCESS
// describe('GET /api/v1/shop/:id', () => {
//   it('responds with the correct banana', async () => {
//     vi.mocked(product.getProductById).mockImplementation(() => {
//       return Promise.resolve({
//         id: 1,
//         name: 'banana',
//         price: 1,
//         description: 'yellow',
//         img_src: 'hi',
//         calorie_count: 1,
//         weight: 1,
//         taste_profile: 'yum',
//         origin: 'nz',
//         random_fact: 'tree',
//       })
//     }) as unknown as shop.Products[]
//     const res = await request(server).get('/api/v1/shop/1')
//     expect(res.body.id).toBe(1)
//     expect(res.body.name).toBe('banana')
//     expect(res.body.price).toBe(1)
//   })
// })
//PRODUCT GET ROUTE FAIL
(0, vitest_1.describe)('GET /api/v1/shop/:id', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(product.getProductById).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/shop/1');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//CART GET ROUTE SUCCESS
(0, vitest_1.describe)('GET /api/v1/cart/:id', () => {
    const mockedCart = [
        {
            id: 1,
            name: 'cavendish',
            price: 10,
            quantity: 1,
            weight: 150,
        },
        {
            id: 1,
            name: 'red banana',
            price: 5,
            quantity: 5,
            weight: 120,
        },
    ];
    (0, vitest_1.it)('responds with correct data structure and values', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.getCartById).mockResolvedValue(mockedCart);
        const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/cart/1');
        const products = response.body;
        (0, vitest_1.expect)(products[0].id).toBe(1);
        (0, vitest_1.expect)(products[0].name).toBe('cavendish');
        (0, vitest_1.expect)(products[0].price).toBe(10);
        (0, vitest_1.expect)(products[0].quantity).toBe(1);
        (0, vitest_1.expect)(products[0].weight).toBe(150);
    }));
});
//CART GET ROUTE FAIL
(0, vitest_1.describe)('GET /api/v1/cart/:id', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.getCartById).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/cart/1');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//HOME POST ROUTE SUCCESS
(0, vitest_1.describe)('POST /api/v1/home', () => {
    const mockedFeatured = [
        {
            id: 2,
            name: 'Red Banana',
            price: 1,
            imgSrc: 'h1',
        },
        {
            id: 4,
            name: 'Lady Finger',
            price: 1,
            imgSrc: 'hi',
        },
        {
            id: 7,
            name: 'Goldfinger',
            price: 1,
            imgSrc: 'hi',
        },
    ];
    (0, vitest_1.it)('responds with correct data structure and values', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(home.getFeaturedById).mockResolvedValue(mockedFeatured);
        const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/home');
        const featuredArr = response.body;
        (0, vitest_1.expect)(featuredArr[0].id).toBe(2);
        (0, vitest_1.expect)(featuredArr[0].name).toBe('Red Banana');
        (0, vitest_1.expect)(featuredArr[0].price).toBe(1);
        (0, vitest_1.expect)(featuredArr[0].imgSrc).toBe('h1');
    }));
});
//HOME POST ROUTE FAIL
(0, vitest_1.describe)('POST /api/v1/home', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(home.getFeaturedById).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/home');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//CART POST ROUTE SUCCESS
(0, vitest_1.describe)('POST /api/v1/cart', () => {
    const mockedFeatured = [
        {
            userId: 2,
            productId: 5,
            quantity: 2,
        },
    ];
    (0, vitest_1.it)('responds with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.addToCartById).mockResolvedValue(mockedFeatured);
        const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/cart');
        (0, vitest_1.expect)(response.status).toBe(200);
    }));
});
//CART POST ROUTE FAIL
(0, vitest_1.describe)('POST /api/v1/cart', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.addToCartById).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/cart');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//CART PATCH ROUTE SUCCESS
(0, vitest_1.describe)('PATCH /api/v1/cart', () => {
    const mockedFeatured = [
        {
            userId: 1,
            productId: 2,
            quantity: 5,
        },
    ];
    (0, vitest_1.it)('responds with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.updateCartItemQuantityByProductId).mockResolvedValue(mockedFeatured);
        const response = yield (0, supertest_1.default)(server_1.default).patch('/api/v1/cart');
        (0, vitest_1.expect)(response.status).toBe(200);
    }));
});
//CART PATCH ROUTE FAIL
(0, vitest_1.describe)('PATCH /api/v1/cart', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.updateCartItemQuantityByProductId).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).patch('/api/v1/cart');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//CART DELETE ROUTE SUCCESS - CLEART CART
(0, vitest_1.describe)('DELETE /api/v1/cart/all', () => {
    const mockedUser = 1;
    (0, vitest_1.it)('responds with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.clearCart).mockResolvedValue(mockedUser);
        const response = yield (0, supertest_1.default)(server_1.default).delete('/api/v1/cart/all');
        (0, vitest_1.expect)(response.status).toBe(200);
    }));
});
//CART DELETE ROUTE FAIL
(0, vitest_1.describe)('DELETE /api/v1/cart/all', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.clearCart).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).delete('/api/v1/cart/all');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
//CART DELETE ROUTE SUCCESS - REMOVE ITEM
// describe('DELETE /api/v1/cart/single', () => {
//   const mockedItem: cart.deleteItem = { userId: 1, productId: 3 }
//   it('responds with status 200', async () => {
//     vi.mocked(cart.removeCartItemByProductId).mockResolvedValue(mockedItem)
//     const response = await request(server).delete('/api/v1/cart/single')
//     expect(response.status).toBe(200)
//   })
// })
//CART DELETE ROUTE FAIL - REMOVE ITEM
(0, vitest_1.describe)('DELETE /api/v1/cart/single', () => {
    const mockedError = new Error('Internal Server Error');
    (0, vitest_1.it)('responds with status 500 and error message on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.mocked(cart.removeCartItemByProductId).mockRejectedValue(mockedError);
        const response = yield (0, supertest_1.default)(server_1.default).delete('/api/v1/cart/single');
        (0, vitest_1.expect)(response.status).toBe(500);
        (0, vitest_1.expect)(response.body.error).toBe('Internal Server Error');
    }));
});
