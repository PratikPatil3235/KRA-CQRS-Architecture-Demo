import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePersonCommand } from "../impl/create-person.command";
import { Person } from "src/entities/person/person";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand>{

    constructor(@InjectRepository(Person) private readonly personRepo:Repository<Person>){}
    async execute(command: CreatePersonCommand): Promise<Person> {
        let person=new Person();
        person.name= command.name;
        person.age=command.age;
        return await this.personRepo.save(person);
    }
}
