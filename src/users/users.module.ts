import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ TypeOrmModule.forFeature([ User ]), HttpModule ]
})
export class UsersModule {}
