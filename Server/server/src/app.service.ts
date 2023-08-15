import { Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  //klient do obsługi użytkownika
  @Client({
    transport: Transport.TCP,
    options:{
      host: '127.0.0.1',
      port: 4001,
    },
  })
  private userClient: ClientTCP;
//klient do obsługi autoryzacji
  @Client({
    transport: Transport.TCP,
    options:{
      host: '127.0.0.1',
      port: 4002,
    },
  })
  private authClient: ClientTCP;
//klient do obsługi tasków
@Client({
  transport: Transport.TCP,
  options:{
    host: '127.0.0.1',
    port: 4003,
  },
})
private logClient: ClientTCP;
  onModuleInit(){
    this.authClient.connect();
    this.userClient.connect();
    this.logClient.connect();
  }
//metoda pobrania informacji o użytkowniku
  async getUserInfo(token: string): Promise<any>{
    return this.userClient.send('get_user', token);
  }
  //metoda pobrania tabeli użytkowników 
  async getUsers():Promise<any>{
    return this.userClient.send('get_users', {});
  }
  //metoda tworzenia użytkownika
  async createUser(dto: any): Promise<any>{
    const userId = await this.authClient.send('create_user', dto);
    console.log(userId);
    return this.userClient.send('create_user_info', { ...dto, userId });
  }
  //metoda logowania użytkownika
  async loginUser(dto:{email: string; password: string}): Promise<any>{
    return this.authClient.send('auth', dto).toPromise();
  }
  //metoda aktualizacji użytkownika
  async updateUser(id: number, dto: any): Promise<any>{
    const userUpdateResponse = await this.userClient.send('update_user',{id, ...dto}).toPromise();

    let authUpdateResponse = null;
    if(dto.email || dto.password){
        authUpdateResponse = await this.authClient.send('update_user_auth_info', {id, ...dto}).toPromise();
    }
    
    return {
        userUpdate: userUpdateResponse,
        authUpdate: authUpdateResponse
    };

  }
  async getUserById(id: number): Promise<any> {
  const authInfo =  await this.authClient.send('get_user_auth_info', id).toPromise();
  const userInfo =  await this.userClient.send('get_user_info', id).toPromise();
  return {...authInfo, ...userInfo};
}
async getTasks(userId: number, month: number): Promise<any> {
  return this.logClient.send('getTasks', { userId, month });
}
async getLogsStatus(userId: number): Promise<any> {
  return this.logClient.send('getLogsStatus', { userId });
}
async seedTask(userId: number, month: number): Promise<any> {
  return this.logClient.send('seedTask', { userId, month });
}

async createLog(log: any): Promise<any> {
  return this.logClient.send('createLog', log)
}
async getNewLogs(): Promise<any> {
  return this.logClient.send('getNewLogs', {}).toPromise();
}

async approveLogs(logIds: number[]): Promise<any> {
  return this.logClient.send('approveLogs', logIds).toPromise();
}

async rejectLogs(logIds: number[]): Promise<any> {
  return this.logClient.send('rejectLogs', logIds).toPromise();
}
}
