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
const seller_model_1 = __importDefault(require("./seller.model"));
const product_model_1 = __importDefault(require("./product.model"));
let Store = class Store extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'store_id',
    })
], Store.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'store_name',
    })
], Store.prototype, "storeName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'address',
    })
], Store.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seller_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'seller_id',
    })
], Store.prototype, "sellerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => seller_model_1.default)
], Store.prototype, "seller", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.default)
], Store.prototype, "products", void 0);
Store = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'store',
    })
], Store);
exports.default = Store;
//# sourceMappingURL=store.model.js.map