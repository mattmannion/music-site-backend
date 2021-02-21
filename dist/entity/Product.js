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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Product = class Product extends typeorm_1.BaseEntity {
    generateId() {
        this.id = uuid_1.v4().replace(/-/g, '');
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "generateId", null);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [[String]]),
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], Product.prototype, "options", void 0);
Product = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Product);
exports.Product = Product;
