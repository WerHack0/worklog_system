## DoIT Worklog System.

System do zarządzania pracą bazujący na mikroserwisach.
### Instalacja i Konfiguracja:
Do porprawnego działania programu należy również zainstalować menadżer pakietów npm
1. **Instalacja NestJS**:
 
   ```bash
   npm install -g @nestjs/cli


Utworzenie bazy danych w Postgres:

Utworzenie tabel w bazie danych:

## Opis bazy danych
#### Tabela autoryzacji użytkownika

```http
  user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id informacji o użytkoniku|
| `email`      | `string` | Adres e-mail użytkownika  |
| `password`      | `string` | Hasło użytkownika użytkownika |

#### Tabela informacji o użytkowniku

```http
  user-info
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id informacji o użytkoniku|
| `user_id`      | `integer` | Id użytkownika  |
| `name`      | `string` | Imie użytkownika |
| `surname`      | `string` | Nazwisko użytkownika |
| `job_position`      | `string` | Stanowisko użytkownika |

#### Tabela zadań

```http
  task
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id pojedyńczego zadania|
| `user_id`      | `integer` | Id użytkownika który dodał zadanie |
| `day`      | `integer` | Dzień danego zadania |
| `month`      | `integer` | Miesiąc danego zadania |
| `work_hours`      | `integer` | Liczba przepracowanych godzin |
| `seend`      | `boolean` | Sprawdzenie czy dany task został wysłany do sprawdzenia |
| `check`      | `boolean` | Potwierdzenie przyjęcia listy zadań przez administratora |
| `task`      | `string` | Opis zadania |
| `sentTimestamp`      | `timestamp` | Data i godzina wysłania zadania do sprawdzenia |

Wprowadź swoje dane dotyczące dostępu do bazy danych w następujących plikach:

   ```bash
   ...\worklog_system\Server\user-service\.env
   ...\worklog_system\Server\user-auth\.env
   ...\worklog_system\Server\task-service\.env
  ```
W tym systemie ustawione:

POSTGRES_HOST = 127.0.0.1

POSTGRES_PORT = 5432

POSTGRES_USERNAME = postgres

POSTGRES_PASSWORD = Q@wertyuiop1

POSTGRES_DATABASE = DoIT

Uruchomienie Mikroserwisów:

Każdy mikroserwis należy uruchomić osobno. Należy wcześniej sprawdzić czy żaden inny serwis nie nasłuchuje na portach :

```bash
3000 - serwer - Gateway
4001 - mikroserwis obsługi użytkownika
4002 - mikroserwis obsługi autoryzacji
4003 - mikroserwis obsługi zadań
```

Uruchomienie mikroserwisu autoryzacji
```bash
cd ...\worklog_system\Server\user-auth
npm start
```

Uruchomienie mikroserwisu obsługi użytkownika
```bash
cd ...\worklog_system\Server\user-service
npm start
```

Uruchomienie mikroserwisu serwisu zadań
```bash
cd ...\worklog_system\Server\task-service
npm start
```

Uruchomienie bramki dostępu
```bash
cd ...\worklog_system\Server\server
npm run start
```


Gdy wszystkie usługi zostaną włączone można przejść do :


## Manual

[Manual administratora](https://github.com/WerHack0/worklog_system/blob/main/manual_admin.pdf)

[Manual pracownika](https://github.com/WerHack0/worklog_system/blob/main/manual_user.pdf)
