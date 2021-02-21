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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordResolver = void 0;
const uuid_1 = require("uuid");
const type_graphql_1 = require("type-graphql");
const sendEmail_1 = require("../utils/sendEmail");
const redis_1 = require("../../redis");
const Users_1 = require("../../entity/Users");
const redisPrefixes_1 = require("../constants/redisPrefixes");
let ForgotPasswordResolver = class ForgotPasswordResolver {
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.Users.findOne({ where: { email } });
            if (!user)
                return true;
            const token = uuid_1.v4();
            yield redis_1.redis.set(redisPrefixes_1.forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24);
            yield sendEmail_1.sendEmail(email, `http://localhost:1234/user/change-password/${token}`);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForgotPasswordResolver.prototype, "forgotPassword", null);
ForgotPasswordResolver = __decorate([
    type_graphql_1.Resolver()
], ForgotPasswordResolver);
exports.ForgotPasswordResolver = ForgotPasswordResolver;
