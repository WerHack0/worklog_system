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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const log_entity_1 = require("./log/log.entity");
const microservices_1 = require("@nestjs/microservices");
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getTasks(query) {
        return this.appService.getTasks(query.userId, query.month);
    }
    async seedTask(data) {
        return this.appService.seedTask(data.userId, data.month);
    }
    async createLog(log) {
        return this.appService.createLog(log);
    }
    async getLogsStatus(data) {
        return this.appService.getLogsStatus(data.userId);
    }
    async getNewLogs() {
        return this.appService.getNewLogs();
    }
    async approveLogs(logIds) {
        return await this.appService.approveLogs(logIds);
    }
    async rejectLogs(logIds) {
        return await this.appService.rejectLogs(logIds);
    }
    async rejectLog(data) {
        return this.appService.rejectLog(data.logId);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('getTasks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTasks", null);
__decorate([
    (0, microservices_1.MessagePattern)('seedTask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "seedTask", null);
__decorate([
    (0, microservices_1.MessagePattern)('createLog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_entity_1.Log]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createLog", null);
__decorate([
    (0, microservices_1.MessagePattern)('getLogsStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getLogsStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)('getNewLogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getNewLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('approveLogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "approveLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('rejectLogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rejectLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('rejectLog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rejectLog", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map