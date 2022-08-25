import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from '../boards/boards.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "sjHan",
    password: "hsjni0110",
    database: "myblog",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}