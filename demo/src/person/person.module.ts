import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handler/get-persons.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person/person';
import { CreatePersonHandler } from './commands/handler/create-person.handler';
import { UpdatePersonHandler } from './commands/handler/update-person.handler';
import { DeletePersonHandler } from './commands/handler/delete-person.handler';
import { GetPersonByIdHandler } from './queries/handler/get-personbyid.hanler';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), CqrsModule],
  controllers: [PersonController],
  providers: [
    GetPersonsHandler,
    CreatePersonHandler,
    UpdatePersonHandler,
    DeletePersonHandler,
    GetPersonByIdHandler,
  ],
})
export class PersonModule {}
