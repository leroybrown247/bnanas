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
const node_path_1 = require("node:path");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const shop = __importStar(require("./db/shop"));
const product = __importStar(require("./db/product"));
const cart = __importStar(require("./db/cart"));
const home = __importStar(require("./db/home"));
const user = __importStar(require("./db/user"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.static((0, node_path_1.join)(__dirname, './public')));
server.use((0, cors_1.default)('*'));
//SHOP GET ROUTE - ALL PRODUCTS
server.get('/api/v1/shop', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield shop.getAllProducts();
        res.json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//PRODUCT GET ROUTE - PRODUCT BY ID
server.get('/api/v1/shop/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const targetProduct = yield product.getProductById(id);
        res.json(targetProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//CART GET ROUTE - CART BY USER ID
server.get('/api/v1/cart/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const targetCart = yield cart.getCartById(id);
        res.json(targetCart);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//CART POST ROUTE - ADD TO CART BY ID
server.post('/api/v1/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = req.body;
        yield cart.addToCartById(newItem);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//CART PATCH ROUTE - UPDATE QUANTITY BY ID
server.patch('/api/v1/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateItem = req.body;
        yield cart.updateCartItemQuantityByProductId(updateItem);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//CART DELETE ROUTE - CLEAR CART
server.delete('/api/v1/cart/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body.userId;
        yield cart.clearCart(input);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//CART DELETE ROUTE - CLEAR ITEM
server.delete('/api/v1/cart/single', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteItem = req.body;
        yield cart.removeCartItemByProductId(deleteItem);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//HOME GET ROUTE - FEATURED BY ID
server.post('/api/v1/home', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredArr = req.body;
        const targetProducts = yield home.getFeaturedById(featuredArr);
        res.json(targetProducts);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//USERS ROUTE - GET ALL USERS
server.get('/api/v1/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.getAllUsers();
        res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
//USERS ROUTE - ADD NEW USER
server.post('/api/v1/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        // { nickname : '', auth0Id : ''}
        yield user.addUser(newUser);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
server.post('/api/v1/user/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth0Id = req.body.auth0Id;
        // { auth0Id : qnwoen12oi3n123}
        const status = yield user.checkIfUserExists(auth0Id);
        res.json(status);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
exports.default = server;
