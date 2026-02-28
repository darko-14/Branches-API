export type User = {
  id: string;
  username: string;
  password: string;
}

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    // password: admin123 (hashed)
    password: '$2b$10$d1eC5Jax5s1iVTboBSnYYeRl6i19EP0agZo4cDJoGln6baAFTfR8u',
  },
];

export type AuthResponseDto = {
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
  }
}