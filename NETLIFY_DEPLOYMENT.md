# Apex Construction - Netlify Deployment Guide

## Overview
This Django project is configured for deployment on Netlify using serverless functions. The application serves both the Django backend and static files.

## Prerequisites
- GitHub account with the repository configured
- Netlify account (https://netlify.com)
- PostgreSQL database (required for production, optional for development)
- Python 3.11+ (local development)

## Architecture

### Deployment Stack
- **Frontend**: Django templates served through Netlify
- **Backend**: Django running as Netlify serverless functions
- **Database**: PostgreSQL (production) / SQLite (development)
- **Static Files**: Served by WhiteNoise middleware
- **Build**: Python 3.11 with pip dependencies

## Pre-Deployment Setup

### 1. Environment Variables

Before deploying, create a `.env` file locally for development:

```
SECRET_KEY=your-secure-random-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com
DATABASE_URL=postgresql://user:password@host/database
CSRF_TRUSTED_ORIGINS=https://your-domain.netlify.app
```

### 2. Database Setup

Choose one of the following PostgreSQL providers:

#### Option A: Neon (Recommended - Free tier with 3 branches)
1. Create account at https://neon.tech
2. Create a new project and database
3. Copy the connection string: `postgresql://user:password@host/database`
4. Add to Netlify environment variables as `DATABASE_URL`

#### Option B: Supabase (Free tier)
1. Create account at https://supabase.com
2. Create new project
3. Copy PostgreSQL connection string from project settings
4. Add to Netlify environment variables as `DATABASE_URL`

#### Option C: Railway
1. Create account at https://railway.app
2. Create new PostgreSQL database
3. Copy connection string
4. Add to Netlify environment variables as `DATABASE_URL`

#### Option D: Other Providers
- ElephantSQL (https://www.elephantsql.com)
- Render (https://render.com)
- Any managed PostgreSQL service

### 3. Generate Secret Key

Generate a secure SECRET_KEY:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Deployment Steps

### Step 1: Connect GitHub Repository

1. Go to https://netlify.com and sign in
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify
4. Select your repository (`kasam-construction`)
5. Netlify will auto-detect the build settings from `netlify.toml`

### Step 2: Configure Environment Variables

In Netlify dashboard:
1. Go to Site Settings → Build & deploy → Environment
2. Add the following environment variables:
   - `SECRET_KEY`: Your secure Django secret key
   - `DEBUG`: `False` (for production)
   - `ALLOWED_HOSTS`: Your Netlify URL and custom domain (comma-separated)
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `CSRF_TRUSTED_ORIGINS`: Your Netlify domain URL
   - `PYTHON_VERSION`: `3.11`

Example:
```
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,kasam.netlify.app,kasam.com
DATABASE_URL=postgresql://user:password@host:5432/kasam
CSRF_TRUSTED_ORIGINS=https://kasam.netlify.app,https://kasam.com
PYTHON_VERSION=3.11
```

### Step 3: Configure Build Settings

In Netlify dashboard:
1. Go to Site Settings → Build & deploy → Build command
2. Verify the build command is set correctly (auto-detected from `netlify.toml`)
3. Functions directory should be set to: `netlify/functions`

### Step 4: Deploy

1. Commit and push your changes to GitHub:
```bash
git add .
git commit -m "Prepare project for Netlify deployment"
git push origin main
```

2. Netlify will automatically trigger a build and deploy

### Step 5: Run Database Migrations

After the first successful deployment:

1. In Netlify, go to Functions → Available Functions
2. Look for the `django` function to verify it's deployed
3. Run migrations manually via your Django admin or custom script

Alternatively, you can add a build hook or use a manual migration command.

## File Structure for Netlify

```
project-root/
├── netlify.toml                 # Netlify configuration
├── netlify/
│   └── functions/
│       └── django.py           # Serverless function handler
├── config/
│   ├── settings.py             # Django settings (updated for Netlify)
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apex/                        # Django app
├── static/                      # Static files (CSS, JS, images)
├── media/                       # User uploaded media
├── staticfiles/                 # Collected static files (build output)
├── manage.py
├── requirements.txt
└── .env                         # Local environment variables (not committed)
```

## Build Process

The Netlify build process performs the following steps:

1. Installs Python 3.11 runtime
2. Installs Python dependencies from `requirements.txt`
3. Collects static files using `collectstatic`
4. Prepares the serverless function in `netlify/functions/`

Build command (defined in `netlify.toml`):
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput
```

## Common Issues and Troubleshooting

### Issue: 500 Error on Deployment
**Solution**:
1. Check Netlify Function logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure DATABASE_URL is valid and the database is accessible
4. Check that SECRET_KEY is set

### Issue: Static Files Not Loading
**Solution**:
1. Verify `STATIC_ROOT = BASE_DIR / 'staticfiles'` in settings.py
2. Ensure `collectstatic` is run during build
3. Check that static files are in the correct directory
4. Clear Netlify cache and redeploy

### Issue: CSRF Token Errors
**Solution**:
1. Add your Netlify domain to `CSRF_TRUSTED_ORIGINS` environment variable
2. Verify HTTPS is enabled (should be automatic)
3. Clear browser cookies and cache

### Issue: Database Connection Errors
**Solution**:
1. Verify DATABASE_URL format: `postgresql://user:password@host:port/dbname`
2. Ensure database host is publicly accessible (or use VPC if supported)
3. Check database credentials are correct
4. Verify database hasn't reached connection limit

### Issue: Timeout on First Deploy
**Solution**:
1. First deployment may take longer due to dependency installation
2. Check Netlify build logs for details
3. May need to increase function timeout in netlify.toml if migrations take too long
4. Consider running migrations separately after deployment

## Monitoring and Maintenance

### View Logs
- Go to Netlify dashboard → Deploys → Open deploy → Functions logs

### Monitor Performance
- Use Netlify Analytics
- Monitor database query performance
- Check function invocation metrics

### Update Dependencies
1. Update `requirements.txt` locally
2. Test thoroughly
3. Commit and push to GitHub
4. Netlify will automatically redeploy

## Custom Domain Setup

1. In Netlify dashboard, go to Site settings → Domain management
2. Add your custom domain
3. Follow instructions to update DNS records
4. Update environment variables with custom domain

## Rollback Deployment

1. Go to Netlify dashboard → Deploys
2. Find the previous successful deploy
3. Click "Restore" to rollback to that version

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Generate and set a strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Enable HTTPS (automatic on Netlify)
- [ ] Set `SECURE_SSL_REDIRECT=True` in production
- [ ] Use environment variables for sensitive data
- [ ] Enable database SSL connections if supported
- [ ] Regularly update dependencies
- [ ] Monitor access logs for suspicious activity

## Performance Optimization

### Static File Caching
- Configure browser caching headers in netlify.toml
- Use CDN for media files (optional)

### Database Optimization
- Use connection pooling (configured in settings.py)
- Optimize database queries
- Consider read replicas for heavy loads

### Function Optimization
- Reduce function size
- Optimize imports
- Cache Django setup across invocations

## Useful Commands

### Local Development
```bash
# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Collect static files
python manage.py collectstatic
```

### Production Testing (Local)
```bash
# Set up .env file with production values
# DEBUG=False
# Create production database locally (if needed)

# Run collectstatic
python manage.py collectstatic --noinput

# Test with production settings
python manage.py test
```

## Support and Resources

- Netlify Documentation: https://docs.netlify.com
- Django Documentation: https://docs.djangoproject.com
- Database Provider Documentation:
  - Neon: https://neon.tech/docs
  - Supabase: https://supabase.com/docs
  - Railway: https://railway.app/docs

## Next Steps

1. Follow deployment steps above
2. Test the deployed site thoroughly
3. Set up monitoring and alerts
4. Configure custom domain if needed
5. Set up automated backups for database
