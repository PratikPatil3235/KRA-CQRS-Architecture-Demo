import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPersonsQuery } from './queries/impl/get-persons.query';
import { CreatePersonCommand } from './commands/impl/create-person.command';
import { UpdatePersonCommand } from './commands/impl/update-person.command';
import { DeletePersonCommand } from './commands/impl/delete-person.command';
import { GetPersonByIDQuery } from './queries/impl/get-personbyid.query';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() paylode: CreatePersonCommand) {
    return await this.commandBus.execute(paylode);
  }
  @Patch('update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePerson(@Body() paylode: UpdatePersonCommand) {
    return this.commandBus.execute(paylode);
  }

  @Delete('delete')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  deletePerson(@Body() paylode: DeletePersonCommand) {
    return this.commandBus.execute(paylode);
  }
  @Get(':id')
  async getPersonById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetPersonByIDQuery(+id));
  }
}
