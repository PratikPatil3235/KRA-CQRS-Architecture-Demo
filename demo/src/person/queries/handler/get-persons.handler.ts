import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPersonsQuery } from '../impl/get-persons.query';
import { Person } from 'src/entities/person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetPersonsQuery)
export class GetPersonsHandler implements IQueryHandler<GetPersonsQuery> {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
  ) {}

  async execute(query: GetPersonsQuery): Promise<Person[]> {
    return await this.personRepo.find();
  }
}
