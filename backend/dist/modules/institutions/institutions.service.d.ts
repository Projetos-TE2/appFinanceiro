import { Repository } from 'typeorm';
import { Institution } from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionsService {
    private institutionRepository;
    constructor(institutionRepository: Repository<Institution>);
    create(createInstitutionDto: CreateInstitutionDto): Promise<Institution>;
    findAll(): Promise<Institution[]>;
    findOne(id: number): Promise<Institution>;
    update(id: number, updateInstitutionDto: UpdateInstitutionDto): Promise<Institution>;
    remove(id: number): Promise<void>;
}
