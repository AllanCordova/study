# Study Timer Application

A Next.js-based study timer application with Pomodoro technique support, featuring character progression, metrics tracking, and a modern UI.

## Description

This is a productivity application designed to help users manage their study sessions using the Pomodoro technique. The app includes:

- **Focus and Break Timer**: Customizable timer for focus and break sessions
- **Character Progression**: Unlock and level up characters based on study achievements
- **Metrics Tracking**: Track your study sessions and progress over time
- **Modern UI**: Clean, responsive interface built with Next.js, React, and Tailwind CSS

## Project Structure

```
study/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── persons/       # Persons API endpoint
│   ├── metrics/           # Metrics page
│   ├── globals.scss       # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── person/           # Person-related components
│   ├── timmer/           # Timer components
│   └── ui/               # UI components
├── context/              # React context providers
├── database/             # Database scripts
│   ├── schema.sql        # Database schema
│   └── seed/             # Seed data
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   └── db.ts            # Database connection
├── services/             # Business logic services
├── templates/            # Component templates
├── tests/                # Test files
├── types/                # TypeScript type definitions
├── docker-compose.yml    # Docker Compose configuration
├── run.sh                # Database management script
└── package.json          # Dependencies and scripts
```

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Docker and Docker Compose
- PostgreSQL (via Docker)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB_NAME=your_database_name
```

### Example `.env` file:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB_NAME=study_db
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with your database credentials (see Environment Variables section above).

### 3. Start Docker Container

Start the PostgreSQL database using Docker Compose:

```bash
docker compose up -d
```

This will start a PostgreSQL container named `study-data-base` on port `5432`.

### 4. Initialize Database

Run the database setup script to create tables and seed initial data:

```bash
# Make the script executable (Linux/Mac)
chmod +x run.sh

# Reset database schema
./run.sh db:reset

# Seed database with initial data
./run.sh db:seed
```

**Note for Windows users**: You can run the commands directly in PowerShell or Git Bash:

```powershell
# Reset database schema
bash run.sh db:reset

# Seed database with initial data
bash run.sh db:seed
```

Or use Docker Compose commands directly:

```bash
# Copy and run schema
docker compose cp ./database/schema.sql db_postgres:/tmp/init.sql
docker compose exec -T db_postgres sh -c "PGPASSWORD='${POSTGRES_PASSWORD}' psql -U '${POSTGRES_USER}' -d '${POSTGRES_DB_NAME}' -f /tmp/init.sql"

# Copy and run seed
docker compose cp ./database/seed/persons.sql db_postgres:/tmp/seed.sql
docker compose exec -T db_postgres sh -c "PGPASSWORD='${POSTGRES_PASSWORD}' psql -U '${POSTGRES_USER}' -d '${POSTGRES_DB_NAME}' -f /tmp/seed.sql"
```

### 5. Run Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Docker Commands

### Start Database Container

```bash
docker compose up -d
```

### Stop Database Container

```bash
docker compose down
```

### View Database Logs

```bash
docker compose logs db_postgres
```

### Access PostgreSQL Shell

```bash
docker compose exec db_postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB_NAME}
```

### Database Management Scripts (run.sh)

The `run.sh` script provides convenient database management commands:

- `./run.sh db:reset` - Resets the database schema
- `./run.sh db:seed` - Seeds the database with initial data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests

## API Documentation

### Interactive Swagger Documentation

Interactive API documentation with Swagger UI is available at:
- **URL**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This provides an interactive interface to explore and test all available API endpoints.

### API Endpoints

The main API endpoint is:
- `GET /api/persons` - Retrieve all persons/characters

For detailed API documentation, see [API Documentation](./docs/api.md).

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Docker** - Containerization
- **Tailwind CSS** - Styling
- **Sass** - CSS preprocessing
- **Jest** - Testing framework

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## License

This project is private and proprietary.
