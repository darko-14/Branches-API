import path from "path"
import { Branch, BranchResponseDto, PaginatedBranchResponseDto } from "./branches.types"
import fs from 'fs/promises'
import { NotFoundError } from "../../utils/errors"

export class BranchRepository {
    private branches: Branch[] = []
    constructor() {
        this.loadData()
    }

    async loadData(): Promise<void> {
        try {
            const filePath = path.join(__dirname, "../../data/data.json");
            const file = await fs.readFile(filePath, "utf-8");
            const data = JSON.parse(file);
            this.branches = data
        } catch (error) {
            console.error("Failed to load data.json", error);
        }
    }

    async getBranches(options?: { page?: number; limit?: number; city?: string }): Promise<BranchResponseDto | PaginatedBranchResponseDto> {
        if (!options?.page && !options?.limit && !options?.city) {
            return {
                items: this.branches,
                total: this.branches.length
            } as BranchResponseDto
        }

        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;
        const city = options?.city;

        let filtered = this.branches;

        if (city) filtered = filtered.filter(b => b.city.toLowerCase() === city.toLowerCase());

        const total = filtered.length;
        const start = (page - 1) * limit;

        const paginated = filtered.slice(start, start + limit);
        
        const hasPrev = page > 1;
        const hasNext = start + limit < total;

        return {
            items: paginated,
            total: this.branches.length,
            page,
            limit,
            hasPrev,
            hasNext
        } as PaginatedBranchResponseDto;
    }

    async getBranchById(id: string): Promise<Branch | undefined> {
        const branch = this.branches.find(b => b.id === id);
        
        if (!branch) throw new NotFoundError()
        return branch;
    }
}