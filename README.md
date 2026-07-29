# Express E-Commerce API

## Database Management with Prisma Studio

Prisma Studio provides a visual interface for inspecting and editing the data in your database.

### Running Prisma Studio

To launch Prisma Studio, run the following command in your terminal:

```bash
npx prisma studio
```

By default, Prisma Studio will open automatically in your browser at:
`http://localhost:5555`

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory and set your `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### 3. Database & Prisma Commands

- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```

- **Run Prisma Studio (GUI):**
  ```bash
  npx prisma studio
  ```

### 4. Start Development Server

```bash
docker compose up -d
```
