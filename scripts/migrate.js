import { initializeDatabase } from '../src/db/index.js';

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    await initializeDatabase();
    console.log('✅ Database migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
