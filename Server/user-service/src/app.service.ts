import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import { CreatedUserDto } from './created-user-dto/created-user-dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepo: Repository<UserInfo>,
    private jwtService: JwtService,
  ) {}

  @Client({
    transport: Transport.TCP,
    options:{
      host:'127.0.0.1',
      port:4002,
    }
  })
  private client: ClientTCP;
  onModuleInit(){
    this.client.connect();
  }

  async getAllWorkers(): Promise<UserInfo[]>{
    return this.userInfoRepo.find();
  }
async getUserInfo(token: string){
  console.log(token);
  //usunięcie nagłówka Bearer
  const actualToken = token.split('Bearer ')[1];
  try{
    const decodeToken = this.jwtService.verify(actualToken);
    const userId = decodeToken.sub;
    const user = await this.userInfoRepo.findOne({where: {user_ID: userId}});
    if(!user){
      throw new UnauthorizedException('Nieprawidłowy token - nie zwrocilo uzytkownika');
    }
    return user;
  }catch(error){
    throw new UnauthorizedException('Nieprawidłowy token', error);
  }
  
}
async updateUser(id: number, dto: any): Promise<any> {
  const user = await this.userInfoRepo.findOne({where: {user_ID: id}});
  if (!user) {
    throw new NotFoundException('Użytkownik nie został znaleziony');
  }
  return this.userInfoRepo.save({ ...user, ...dto });
}

async createUser(userDto: any): Promise<number>{
  const response = await this.client.send<{ID: number}, {email: string, password:string}>(
    'create_user',
    {
      email: userDto.email,
      password: userDto.password,
    }
  ).toPromise();
  return response.ID
}
async saveUserInfo(userId: number, userDto: CreatedUserDto): Promise<UserInfo>{
  const userInfo = new UserInfo();
  userInfo.user_ID = userId;
  userInfo.name = userDto.name;
  userInfo.surname = userDto.surname;
  userInfo.job_position = userDto.job_position;

  return this.userInfoRepo.save(userInfo);
}
async getUserById(id: number): Promise<UserInfo> {
  const user = await this.userInfoRepo.findOne({ where: { user_ID: id } });
  if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
  }
  return user;
}
}
