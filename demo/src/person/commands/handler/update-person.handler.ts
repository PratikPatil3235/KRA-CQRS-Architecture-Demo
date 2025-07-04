import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Person } from 'src/entities/person/person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePersonCommand } from '../impl/update-person.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler
  implements ICommandHandler<UpdatePersonCommand>
{
  constructor(
    @InjectRepository(Person) private readonly personRepo: Repository<Person>,
  ) {}
  async execute(command: UpdatePersonCommand): Promise<Person> {
    const person = await this.personRepo.findOne({ where: { id: command.id } });
    if (!person) {
      throw new NotFoundException(`Person with id ${command.id} not found`);
    }
    person.age = command.age;
    person.name = command.name;
    return await this.personRepo.save(person);
  }
}
