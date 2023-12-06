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
exports.checkIfUserExists = exports.addUser = exports.getAllUsers = void 0;
const connection_1 = __importDefault(require("./connection"));
function getAllUsers(db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db('users').select('id', 'nickname', 'auth0_id as auth0Id'));
    });
}
exports.getAllUsers = getAllUsers;
function addUser(newUser, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db('users').insert({
            nickname: newUser.nickname,
            auth0_id: newUser.auth0Id,
        }));
    });
}
exports.addUser = addUser;
function checkIfUserExists(auth0Id, db = connection_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db('users')
            .select('auth0_id')
            .where('auth0_id', auth0Id)
            .first();
        return !!result;
        //The !! operator is used to convert the result to a boolean value.
    });
}
exports.checkIfUserExists = checkIfUserExists;
