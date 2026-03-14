# 1. Setup Phase: Use Node 22.14.0 directly to guarantee Prisma's requirement (22.12+)
FROM node:22.14.0-bookworm-slim

# Install native dependencies required by better-sqlite3 (python3, gcc, gnumake)
RUN apt-get update && apt-get install -y \
    python3 \
    gcc \
    g++ \
    make \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Install the exact PNPM version used in the project
RUN npm install -g pnpm@10.32.1

# Set the working directory
WORKDIR /app

# Copy package management files first for layer caching
COPY package.json pnpm-lock.yaml ./

# 2. Install dependencies (better-sqlite3 will compile natively here)
RUN pnpm install

# Copy the rest of the application code
COPY . .

# 3 & 4. Run database push and application build
RUN pnpm run db:push && pnpm run build

# Expose port (Railway manages this automatically, but good practice)
EXPOSE 3000

# 5. Start the server
CMD ["pnpm", "run", "start:server"]
