import { describe, it, expect } from 'vitest';
import { BranchService } from '../modules/branches/branches.service';
import { BranchRepository } from '../modules/branches/branches.repository';

describe('BranchService', async () => {
  const repo = new BranchRepository();
  await repo.loadData()
  const service = new BranchService(repo);


  it('should return all branches', async () => {
    const result = await service.getBranches();
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.total).toBeGreaterThan(0);
  });

  it('should filter branches by city', async () => {
    const result = await service.getBranches({ limit: undefined, page: undefined, city: 'Скопје' });
    expect(result.items.every(b => b.city === 'Скопје')).toBe(true);
  });

  it('should paginate branches', async () => {
    const result = await service.getBranches({ page: 1, limit: 2 });
    expect(result.items.length).toBeLessThanOrEqual(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(2);
  });

  it('should get branch by id', async () => {
    const branch = await service.getBranchById('0201461');
    expect(branch).toBeDefined();
    expect(branch.id).toBe('0201461');
  });
});