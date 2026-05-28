import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/db/index.js';
import { cache } from './src/utils/helpers.js';
import routes from './src/routes/index.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: true,
}));

// Static files
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/media', express.static(path.join(__dirname, 'media')));

// View engine setup (using EJS for templating)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Custom middleware to handle template rendering (EJS needs .ejs extension, but we have .html files)
app.engine('html', (filePath, data, callback) => {
  // For HTML files, we'll use simple string replacement
  const fs = require('fs');
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return callback(err);
    
    // Simple template engine for now - can be replaced with proper engine
    let result = html;
    for (const [key, value] of Object.entries(data)) {
      // Handle simple variable interpolation
      result = result.replace(new RegExp(`\\$\\{\\s*${key}\\s*\\}`, 'g'), value || '');
    }
    
    callback(null, result);
  });
});

// Cache middleware
const cacheMiddleware = cache(60 * 15); // 15 minutes

// Routes
app.get('/', cacheMiddleware, routes.get('/'));
app.get('/services', cacheMiddleware, routes.get('/services'));
app.get('/projects', cacheMiddleware, routes.get('/projects'));
app.get('/about', cacheMiddleware, routes.get('/about'));
app.get('/contact', cacheMiddleware, routes.get('/contact'));
app.post('/contact', routes.post('/contact'));

// Use main routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'An error occurred' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`Ka'sam Enterprises server running on port ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
