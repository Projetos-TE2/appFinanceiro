import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionsController {
    private readonly institutionsService;
    constructor(institutionsService: InstitutionsService);
    create(createInstitutionDto: CreateInstitutionDto): Promise<import("./entities/institution.entity").Institution>;
    findAll(): Promise<import("./entities/institution.entity").Institution[]>;
    findOne(id: string): Promise<import("./entities/institution.entity").Institution>;
    update(id: string, updateInstitutionDto: UpdateInstitutionDto): Promise<import("./entities/institution.entity").Institution>;
    remove(id: string): Promise<void>;
}
