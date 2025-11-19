# Clone the repo
git clone <your-repo-link>
cd <repo-folder>

# Install dependencies for frontend and backend
cd apps/api
npm install
cd ../web
npm install

# Database setup (Prisma + SQLite)
cd ../api
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts

# Optional: Reset database and reseed
npx prisma db push --force-reset
npx ts-node prisma/seed.ts

# Start the backend and frontend
# You can run them concurrently in separate terminals
cd apps/api
npm run dev

cd apps/web
npm run dev
