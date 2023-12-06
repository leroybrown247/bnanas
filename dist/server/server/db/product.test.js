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
const db = __importStar(require("./product"));
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
(0, vitest_1.describe)('getProductById', () => {
    (0, vitest_1.it)('object has id property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('id');
    }));
    (0, vitest_1.it)('object has name property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('name');
    }));
    (0, vitest_1.it)('object has price property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('price');
    }));
    (0, vitest_1.it)('object has description property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('description');
    }));
    (0, vitest_1.it)('object has img property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('imgSrc');
    }));
    (0, vitest_1.it)('object has calorie property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('calorieCount');
    }));
    (0, vitest_1.it)('object has weight property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('weight');
    }));
    (0, vitest_1.it)('object has taste profile property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('tasteProfile');
    }));
    (0, vitest_1.it)('object has origin property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('origin');
    }));
    (0, vitest_1.it)('object has random fact property', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db.getProductById(1, testDb);
        (0, vitest_1.expect)(product).toHaveProperty('randomFact');
    }));
});
