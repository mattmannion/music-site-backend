"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ChangePasswordResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const type_graphql_1 = require("type-graphql");
const redis_1 = require("../../redis");
const Users_1 = require("../../entity/Users");
const ChangePasswordInput_1 = require("./changePassword/ChangePasswordInput");
const redisPrefixes_1 = require("../constants/redisPrefixes");
let ChangePasswordResolver = class ChangePasswordResolver {
    changePassword({ token, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.forgotPasswordPrefix + token);
            if (!userId)
                return null;
            const user = yield Users_1.Users.findOne(userId);
            if (!user)
                return null;
            yield redis_1.redis.del(token);
            user.password = yield bcrypt_1.default.hash(password, 12);
            yield user.save();
            ctx.req.session.userId = user.id;
            return user;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Users_1.Users, { nullable: true }),
    __param(0, type_graphql_1.Arg('data')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordInput_1.ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], ChangePasswordResolver.prototype, "changePassword", null);
ChangePasswordResolver = __decorate([
    type_graphql_1.Resolver()
], ChangePasswordResolver);
exports.ChangePasswordResolver = ChangePasswordResolver;
