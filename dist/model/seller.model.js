"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const store_model_1 = __importDefault(require("./store.model"));
const order_model_1 = __importDefault(require("./order.model"));
let Seller = class Seller extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'seller_id',
    })
], Seller.prototype, "sellerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'mobile_number',
    })
], Seller.prototype, "mobileNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'token',
    })
], Seller.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => store_model_1.default)
], Seller.prototype, "stores", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.default)
], Seller.prototype, "orders", void 0);
Seller = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'seller',
    })
], Seller);
exports.default = Seller;
//# sourceMappingURL=seller.model.js.map