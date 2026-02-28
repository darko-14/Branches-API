import { BranchRepository } from "./branches.repository";
import { GetBranchByIdDTO, GetBranchesDTO } from "./branches.schema";
import { BranchResponseDto, PaginatedBranchResponseDto } from "./branches.types";

export class BranchService {
    constructor(private branchRepository: BranchRepository) { }

    async getBranches(query?: GetBranchesDTO): Promise<BranchResponseDto | PaginatedBranchResponseDto> {
        return this.branchRepository.getBranches(query);
    }

    async getBranchById(id: string): Promise<GetBranchByIdDTO | undefined> {
        const branch = await this.branchRepository.getBranchById(id);
        return branch;
    }
}