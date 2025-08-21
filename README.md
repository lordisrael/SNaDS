# SNaDS (Smart Notification and Delivery System)

Lightweight backend for managing users, preferences, events and logs. Built with Node + TypeScript, Express, Mongoose, Kafka and Redis.

## Features
- User and preference management (CRUD)
- Event ingestion and processing via Kafka
- Logging & audit endpoints
- OpenAPI (Swagger) docs at /api-docs
- Central error handling with Mongoose validation + duplicate-key handling

## Requirements
- Node.js 18+ (or current LTS)
- npm 8+ / yarn
- MongoDB (dev or remote)
- Kafka broker(s) (if running consumers/producers)
- Redis (optional, used by some services)

## Quick start (development)
1. Clone repository and install:
   ```bash
   git clone <repo-url> c:\Users\user\Desktop\SNaDS
   cd c:\Users\user\Desktop\SNaDS
   npm install
   ```

2. Create a `.env` file at project root (see sample below).

3. Run in development (hot reload for API and consumer):
   ```bash
   npm run dev
   ```

4. Open API docs:
   - http://localhost:3000/api-docs

## Production
- Build:
  ```bash
  npm run build
  ```
- Start:
  ```bash
  npm start
  ```

(When containerising, use your Dockerfile / docker-compose to expose PORT and mount env.)

## Scripts
- `npm run dev` — dev watchers (API + consumer concurrently)
- `npm run dev:api` — dev only API (API + consumer concurrently)
- `npm run dev:consumer` — dev only consumer
- `npm run build` — TypeScript compile
- `npm start` — run built app (production)

## Environment variables (example)
Create `.env` and populate required values:
```env
NODE_ENV=development
PORT=3000

# Mongo
MONGO_URI_DEV=mongodb://localhost:27017/snads-dev
MONGO_URI_PROD=mongodb://mongo:27017/snads

# Kafka
KAFKA_CLIENT_ID=snads
KAFKA_BROKERS=localhost:9092

# Redis (if used)
REDIS_URL=redis://localhost:6379

# Auth / JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Email / SMTP (nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

## API documentation
OpenAPI docs are available at:
- GET /api-docs

The YAML spec lives at `swagger.yaml` in the project root.

## Error handling notes
- Mongoose ValidationError -> HTTP 400 with joined validation messages
- Duplicate key (code 11000) -> HTTP 400 with offending field information
- CastError (invalid ObjectId) -> HTTP 400 (invalid id) or 404 when resource not found

## Project structure (high-level)
- src/
  - api/ (controllers, routes)
  - config/ (db)
  - middleware/ (error handlers, not-found)
  - models/ (Mongoose schemas)
  - services/ (kafka, queue, workers)
  - consumers/ (background consumers)
  - app.ts (entry for dev)
- swagger.yaml (OpenAPI spec)
- package.json, tsconfig.json

## Troubleshooting
- If you see "Class extends value ... is not a constructor": ensure `src/error/custom-api.ts` exports a proper ES class and TypeScript interop is configured.
- If imports complain about default exports, either enable `esModuleInterop` in `tsconfig.json` or use `import * as name from 'module'`.
- Check container logs for crashes:
  ```bash
  docker ps -a
  docker logs -f <container-name>
  ```

## Contributing
- Fork, create feature branch, open PR.
- Keep changes small and CI-friendly. Add unit tests where applicable.

## License
Specify license in package.json (currently ISC) — change as