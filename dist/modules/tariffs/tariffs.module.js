"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tariff_schema_1 = require("./schemas/tariff.schema");
const tariffs_controller_1 = require("./tariffs.controller");
const tariffs_service_1 = require("./tariffs.service");
let TariffsModule = class TariffsModule {
};
exports.TariffsModule = TariffsModule;
exports.TariffsModule = TariffsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tariff_schema_1.Tariff.name, schema: tariff_schema_1.TariffSchema }
            ])
        ],
        controllers: [tariffs_controller_1.TariffsController],
        providers: [tariffs_service_1.TariffsService],
        exports: [tariffs_service_1.TariffsService],
    })
], TariffsModule);
//# sourceMappingURL=tariffs.module.js.map