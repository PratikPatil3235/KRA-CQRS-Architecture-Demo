import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePersonCommand } from '../impl/delete-person.command';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { NotFoundException } from '@nestjs/common';
import { retry } from 'rxjs';

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler
  implements ICommandHandler<DeletePersonCommand>
{
  constructor(
    @InjectRepository(Person) private readonly personRepo: Repository<Person>,
  ) {}

  async execute(command: DeletePersonCommand): Promise<DeleteResult> {
    const person = await this.personRepo.delete(command.id);
    if (!person) {
      throw new NotFoundException(`Person not found...`);
    }
    return person;
  }
}
