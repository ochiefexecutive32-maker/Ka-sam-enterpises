# Ka'sam Construction Enterprise - Node.js

Ka'sam Construction Enterprise is a modern Node.js/Express-based website for a construction company. The project includes:

- Services, projects, team members, testimonials, and machine hire models
- A contact page with message and consultation forms
- Dynamic templates powered by Express routes and SQLite database
- Static assets for CSS and JavaScript
- **Production-ready for Vercel deployment**

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- SQLite3 (included with Node.js sqlite3 package)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   
   For local development, the defaults work fine.

3. Initialize the database:
   ```bash
   npm run migrate
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the site in your browser at `http://localhost:3000/`

## Project Structure

```
ka-sam-enterprises/
├── src/                       # Source code
│   ├── models/               # Database models and queries
│   │   └── index.js          # Model functions
│   ├── controllers/          # Route handlers
│   │   └── index.js          # Controller functions
│   ├── routes/               # Express routes
│   │   └── index.js          # Route definitions
│   ├── db/                   # Database setup
│   │   └── index.js          # SQLite configuration
│   ├── utils/                # Utility functions
│   │   └── helpers.js        # Helper functions
│   └── middleware/           # Custom middleware
├── views/                     # EJS templates
│   ├── home.html
│   ├── services.html
│   ├── projects.html
│   ├── about.html
│   ├── contact.html
│   ├── error.html
│   └── 404.html
├── static/                    # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                     # User-uploaded files
├── data/                      # SQLite database file
├── scripts/                   # Utility scripts
│   └── migrate.js            # Database migration script
├── server.js                 # Main application entry point
├── vercel.json               # Vercel configuration
├── package.json              # Node.js dependencies
└── .env.example              # Environment variables template
```

## API Endpoints

- `GET /` - Home page
- `GET /services` - Services listing
- `GET /projects` - Projects and machine hire
- `GET /about` - Team information
- `GET /contact` - Contact form
- `POST /contact` - Submit contact or consultation form

## Deployment to Vercel

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Convert to Node.js - Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect Node.js
   - Environment variables are optional (all have defaults)
   - Deploy!

### Environment Variables for Vercel:
- `NODE_ENV` - Set to `production`
- `SESSION_SECRET` - Your session secret (auto-generated if not set)

## Key Features

- ✅ **Production-Ready**: Configured for Vercel serverless deployment
- ✅ **Database**: SQLite with persistent file storage
- ✅ **Static Files**: Optimized serving of CSS, JS, and images
- ✅ **Security**: HTTPS support, session management
- ✅ **Caching**: HTTP caching for performance
- ✅ **Responsive**: Bootstrap 5 integration

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Run production server
npm start

# Initialize/migrate database
npm run migrate

# Build for production
npm run build
```

## Technologies Used

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: SQLite3
- **Templating**: EJS
- **Deployment**: Vercel
- **Session Management**: express-session
- **Environment**: dotenv

## Notes

- The project uses SQLite for both development and production
- Database file is stored in `data/app.db`
- All static files are served from the `static/` directory
- User-uploaded media is stored in the `media/` directory
- Sessions are managed with express-session using memory store

## Troubleshooting

If you encounter issues:

1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment-specific issues
2. Verify `.env` file is configured correctly
3. Check the Vercel logs in your dashboard
4. Ensure all dependencies are installed: `npm install`
5. Try clearing the cache: `rm -rf node_modules package-lock.json && npm install`

## License

This project is the property of Ka'sam Construction Enterprise
