import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPersonByIDQuery } from '../impl/get-personbyid.query';
import { Person } from 'src/entities/person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPersonByIDQuery)
export class GetPersonByIdHandler implements IQueryHandler<GetPersonByIDQuery> {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
  ) {}

  async execute(query: GetPersonByIDQuery): Promise<Person> {
    const person = await this.personRepo.findOne({
      where: { id: query.id },
    });
    if (!person) {
      throw new NotFoundException(`Person with ${query.id} not found...`);
    }
    return person;
  }
}
