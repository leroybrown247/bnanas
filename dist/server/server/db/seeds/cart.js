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
exports.seed = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('cart').del();
        yield knex('cart').insert([
            { id: 1, user_id: 'a0', product_id: 1, quantity: 1 },
            { id: 2, user_id: 'a0', product_id: 3, quantity: 2 },
            { id: 3, user_id: 'a0', product_id: 2, quantity: 8 },
            { id: 4, user_id: 'a0', product_id: 4, quantity: 16 },
        ]);
    });
};
