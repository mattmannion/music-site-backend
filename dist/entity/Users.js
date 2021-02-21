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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Users = class Users extends typeorm_1.BaseEntity {
    name(parent) {
        return `${parent.firstName} ${parent.lastName}`;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users]),
    __metadata("design:returntype", String)
], Users.prototype, "name", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('bool', { default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "confirmed", void 0);
Users = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Users);
exports.Users = Users;
