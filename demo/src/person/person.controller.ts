import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPersonsQuery } from './queries/impl/get-persons.query';
import { CreatePersonCommand } from './commands/impl/create-person.command';

@Controller('person')
export class PersonController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}
  @Get('all')
  async getAllPersons() {
    return await this.queryBus.execute(new GetPersonsQuery());
  }
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({transform:true}))
  async save(@Body() paylode: CreatePersonCommand) {
   return await this.commandBus.execute(paylode);
  }
}
