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
const db = __importStar(require("./home"));
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
(0, vitest_1.describe)('getFeaturedById', () => {
    const testArr = [4, 2, 7];
    (0, vitest_1.it)('has the correct length', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured).toHaveLength(3);
    }));
    (0, vitest_1.it)('first product has correct name', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[0].name).toBe('Red Banana');
    }));
    (0, vitest_1.it)('first product has correct price', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[0].price).toBe(499.99);
    }));
    (0, vitest_1.it)('first product has correct image source', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[0].imgSrc).toBe('/images/red-banana.jpg');
    }));
    (0, vitest_1.it)('second product has correct name', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[1].name).toBe('Lady Finger');
    }));
    (0, vitest_1.it)('second product has correct price', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[1].price).toBe(199.99);
    }));
    (0, vitest_1.it)('second product has correct image source', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[1].imgSrc).toBe('/images/lady-finger.jpg');
    }));
    (0, vitest_1.it)('third product has correct name', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[2].name).toBe('Goldfinger');
    }));
    (0, vitest_1.it)('third product has correct price', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[2].price).toBe(139.99);
    }));
    (0, vitest_1.it)('third product has correct image source', () => __awaiter(void 0, void 0, void 0, function* () {
        const featured = yield db.getFeaturedById(testArr, testDb);
        (0, vitest_1.expect)(featured[2].imgSrc).toBe('/images/goldfinger.jpg');
    }));
});
