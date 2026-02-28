import { describe, it, expect } from 'vitest';
import { AuthService } from '../modules/auth/auth.service';
import { users } from '../modules/auth/auth.types';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  const service = new AuthService();

  it('should login with correct credentials', async () => {
    const user = users[0];
    const result = await service.login(user.username, 'admin123');
    expect(result.token).toBeDefined();
    expect(result.user?.username).toBe(user.username);
  });

  it('should throw on invalid credentials', async () => {
    await expect(service.login('notfound', 'badpass')).rejects.toThrow();
  });

  it('should logout successfully', async () => {
    const result = await service.logout();
    expect(result.message).toBeDefined();
  });
});