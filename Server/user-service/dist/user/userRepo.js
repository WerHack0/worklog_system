"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_info_entity_1 = require("../user-info/user-info.entity");
let UserRepository = exports.UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUser(userDto) {
        const userInfo = new user_info_entity_1.UserInfo();
        userInfo.name = userDto.name;
        userInfo.surname = userDto.surname;
        userInfo.job_position = userDto.job_position;
        const user = new user_entity_1.User();
        user.email = userDto.email;
        user.password = userDto.password;
        user.userInfo = userInfo;
        return this.save(user);
    }
};
exports.UserRepository = UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
//# sourceMappingURL=userRepo.js.map