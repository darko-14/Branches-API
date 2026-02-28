# Branches API

A simple, modular RESTful API for managing bank branches and authentication, built with Express and TypeScript.

## Features
- User authentication with JWT and cookies
- Branch listing with pagination and filtering
- Modular structure (controllers, services, repositories)
- DTO validation (Zod or class-validator)
- Custom error handling
- Middleware for logging, rate limiting, and response wrapping
- In-memory data storage (JSON file)

## Project Structure
```
src/
  app.ts                # Express app setup
  server.ts             # Server entry point
  modules/
    auth/               # Auth logic (controller, service, routes, types)
    branches/           # Branch logic (controller, service, repository, types)
  middleware/           # Custom middlewares
  utils/                # Utilities (errors, config)
  data/                 # data.json (branch data)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/darko-14/Branches-API.git
   cd Branches-API
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and set your environment variables (e.g., JWT_SECRET).

### Running the Server
```sh
npm run dev
```

The server will start on the port specified in your `.env` or default to 3000.

## API Endpoints

### Auth
- `POST /auth/login` — Login with username and password
- `POST /auth/logout` — Logout (clears cookie)

### Branches
- `GET /api/branches` — List branches (supports `page`, `limit`, `city` query params)
- `GET /api/branches/:id` — Get branch by ID

## Example Request
```
GET /api/branches?page=1&limit=5&city=Скопје
```

## Testing
- Tests are located in `src/__tests__/`
- Run tests with:
  ```sh
  npm test
  ```

## License
MIT
