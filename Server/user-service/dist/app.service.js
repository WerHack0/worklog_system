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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_info_entity_1 = require("./user-info/user-info.entity");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
let AppService = exports.AppService = class AppService {
    constructor(userInfoRepo, jwtService) {
        this.userInfoRepo = userInfoRepo;
        this.jwtService = jwtService;
    }
    onModuleInit() {
        this.client.connect();
    }
    async getAllWorkers() {
        return this.userInfoRepo.find();
    }
    async getUserInfo(token) {
        console.log(token);
        const actualToken = token.split('Bearer ')[1];
        try {
            const decodeToken = this.jwtService.verify(actualToken);
            const userId = decodeToken.sub;
            const user = await this.userInfoRepo.findOne({ where: { user_ID: userId } });
            if (!user) {
                throw new common_1.UnauthorizedException('Nieprawidłowy token - nie zwrocilo uzytkownika');
            }
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Nieprawidłowy token', error);
        }
    }
    async updateUser(id, dto) {
        const user = await this.userInfoRepo.findOne({ where: { user_ID: id } });
        if (!user) {
            throw new common_1.NotFoundException('Użytkownik nie został znaleziony');
        }
        return this.userInfoRepo.save({ ...user, ...dto });
    }
    async createUser(userDto) {
        const response = await this.client.send('create_user', {
            email: userDto.email,
            password: userDto.password,
        }).toPromise();
        return response.ID;
    }
    async saveUserInfo(userId, userDto) {
        const userInfo = new user_info_entity_1.UserInfo();
        userInfo.user_ID = userId;
        userInfo.name = userDto.name;
        userInfo.surname = userDto.surname;
        userInfo.job_position = userDto.job_position;
        return this.userInfoRepo.save(userInfo);
    }
    async getUserById(id) {
        const user = await this.userInfoRepo.findOne({ where: { user_ID: id } });
        if (!user) {
            throw new common_1.NotFoundException('Użytkownik nie został znaleziony');
        }
        return user;
    }
};
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 4002,
        }
    }),
    __metadata("design:type", microservices_1.ClientTCP)
], AppService.prototype, "client", void 0);
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_info_entity_1.UserInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map