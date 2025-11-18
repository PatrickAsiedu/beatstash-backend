# Beatstash Backend

A lightweight backend for Beatstash — an app for uploading, sharing, and discovering beats. Built with TypeScript, Express, MongoDB, Passport (local + Google OAuth), and AWS S3 for media storage. The project also integrates OpenAI for AI-related features.

## Features

- User signup / login (local + Google)
- Session-based authentication stored in MongoDB
- Upload/serve beat files via AWS S3
- Endpoints for beats and users
- OpenAI integration for content analysis

## Tech

- Node.js + TypeScript
- Express
- MongoDB (mongoose)
- Passport (passport-local, passport-google-oauth20)
- AWS S3 (@aws-sdk/client-s3)
- OpenAI

## Prerequisites

- Node.js (recommended v18+)
- npm or yarn
- A running MongoDB instance (local or Atlas)
- AWS credentials for S3 access (if using S3 features)
- Google OAuth credentials (if using Google sign-in)
- OpenAI API key (if using OpenAI features)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at the project root. See the Environment variables section below for required keys. Example:

```env
NODE_ENV=development
DB_PORT=3000
DB_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/beatstash?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
AWS_S3BUCKET_ACCESS_KEY_ID=AKIA...
AWS_S3BUCKET_SECRETACCESSK_KEY=...
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-s3-bucket
OPEN_AI_API_KEY=sk-...
```

> Note: There is a typo in the project environment variable name for the AWS secret key (`AWS_S3BUCKET_SECRETACCESSK_KEY`) — use the same variable name as above to match the code.

3. Build the TypeScript code

```bash
npx tsc
```

4. Start the server (production)

```bash
npm start
```

Or run in development mode (watch + nodemon):

```bash
npm run dev
```

The app listens on the port provided in `DB_PORT` (yes, this project uses `DB_PORT` for the server port). Connect your client to `http://localhost:<DB_PORT>`.

## Available scripts (from package.json)

- `npm run dev` — start development mode (runs `tsc -w` and `nodemon dist/server.js`).
- `npm start` — run compiled server from `dist/server.js`.

If you prefer explicit build+start steps:

```bash
npx tsc
node dist/server.js
```

## Environment variables

The project expects the following environment variables (defined in `src/types/environment.d.ts`):

- NODE_ENV — `development` or `production`
- DB_PORT — port number the Express app will listen on (string)
- DB_URL — MongoDB connection string
- GOOGLE_CLIENT_ID — Google OAuth client ID
- GOOGLE_CLIENT_SECRET — Google OAuth client secret
- AWS_S3BUCKET_ACCESS_KEY_ID — AWS access key
- AWS_S3BUCKET_SECRETACCESSK_KEY — AWS secret key (note the project's variable name contains a spelling/typo; keep it identical)
- AWS_REGION — AWS region for S3
- AWS_BUCKET_NAME — target S3 bucket name
- OPEN_AI_API_KEY — API key for OpenAI

Optional / recommended

- Replace the hard-coded session secret in `src/server.ts` with a secure env var (not currently implemented in code). Example: `SESSION_SECRET`.

## API Endpoints (overview)

- `POST /signup` — create user
- `POST /login` — local login
- `GET /logout` — logout
- `GET /auth/...` — Google OAuth routes (see `src/routes/usegoogle.ts`)
- `GET/POST /beats` — beats API (see `src/routes/api/beats.ts`)
- `GET/POST /users` — user endpoints (see `src/routes/api/users.ts`)
- `GET /getdata` — protected test route (requires authentication)

Refer to the controller files in `src/controllers/` for full behavior and payloads.

## CORS

Allowed origins are defined in `src/config/allowedOrigins.ts` and enforced via `src/config/corsOptions.ts`. If you get `Origin <x> not allowed by CORS`, add your client's origin to `allowedOrigins`.

## S3 Uploads

S3 configuration uses `src/config/awsbucketConfig.ts` and environment variables listed above. File upload utilities live under `src/services/s3bucket/`.

## Notes & gotchas

- The server uses `DB_PORT` for the HTTP port which is an unusual name — double-check your `.env` when running locally.
- Session secret is currently hard-coded as `beatstashsessions` in `src/server.ts`. For security, change this to read from an env var and use a strong random secret.
- The AWS secret env var name contains a typo in the repository (`AWS_S3BUCKET_SECRETACCESSK_KEY`). Keep this name to match the code or update the code to use a corrected name.

## File structure (high level)

- `src/server.ts` — application entrypoint
- `src/config/` — configuration for DB, CORS, AWS
- `src/routes/` — Express routes
- `src/controllers/` — route handlers
- `src/services/` — helper services (s3, openAI, posts, users)
- `src/middleware/` — express middleware
- `src/model/` — Mongoose models
- `src/types/` — TypeScript type declarations



## Troubleshooting

- MongoDB connection errors: verify `DB_URL` is correct and reachable from your network.
- Port already in use: change `DB_PORT` or stop the process using that port.
- CORS errors: add your origin to `src/config/allowedOrigins.ts`.

---

If you'd like, I can also:

- Add a `.env.example` file with the variables above
- Add a `build` script to `package.json` (e.g. `tsc`) and a `start:dev` script that uses `ts-node-dev` or similar

Tell me which of those you'd like next.
