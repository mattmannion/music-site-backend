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
exports.UpdateJsonResolver = void 0;
const type_graphql_1 = require("type-graphql");
const jsonbtest_1 = require("../../entity/jsonbtest");
const createJsonInput_1 = require("./jsonbInputs/createJsonInput");
let UpdateJsonResolver = class UpdateJsonResolver {
    updateJsonById(id, { name, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield jsonbtest_1.jsonbtest.findOne(id);
            if (!found)
                throw new Error('No item found');
            const colors = options.map(({ color }) => color);
            const imgs = options.map(({ img }) => JSON.stringify(img));
            const jsonString = () => {
                let res = [];
                for (let i = 0; i < options.length; i++) {
                    res.push(`json('{"color": "${colors[i]}", "img": ${imgs[i]}}')`);
                }
                return res;
            };
            yield jsonbtest_1.jsonbtest.delete(id);
            yield jsonbtest_1.jsonbtest.query(`
      insert into jsonbtest(id, name, options)
      values('${id}', '${name}', array[${jsonString().join(',')}])
    `);
            return jsonbtest_1.jsonbtest.create({ id, name, options });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => jsonbtest_1.jsonbtest),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createJsonInput_1.Input]),
    __metadata("design:returntype", Promise)
], UpdateJsonResolver.prototype, "updateJsonById", null);
UpdateJsonResolver = __decorate([
    type_graphql_1.Resolver()
], UpdateJsonResolver);
exports.UpdateJsonResolver = UpdateJsonResolver;
