import { GetBranchByIdDTO, GetBranchesDTO } from "./branches.schema";
import { BranchService } from "./branches.service";
import { Request, Response } from "express";

export class BranchController {
    constructor(private branchService: BranchService) { }

    getBranches = async (req: Request, res: Response): Promise<void> => {
        const { page, limit, city } = req.validatedQuery as GetBranchesDTO;
        const result = await this.branchService.getBranches({ page, limit, city });
        res.success(result);
    }

    getBranchById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.validatedParams as GetBranchByIdDTO;
        const result = await this.branchService.getBranchById(id)
        res.success(result)
    }
} 