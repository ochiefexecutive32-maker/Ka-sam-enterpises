# Apex Construction - Vercel Deployment Guide

## Prerequisites
- GitHub account with the repository set up
- Vercel account (https://vercel.com)
- PostgreSQL database (required for production)
- Python 3.11+

## Changes Made for Vercel Compatibility

### 1. Database Migration
- **From**: SQLite (file-based, not suitable for serverless)
- **To**: PostgreSQL (cloud-hosted, scalable)
- SQLite will continue to work locally for development

### 2. New Files Added
- `vercel.json` - Vercel deployment configuration
- `runtime.txt` - Python version specification (3.11)
- `api/index.py` - Serverless function handler for Vercel
- `.env.example` - Environment variables template
- `build.sh` - Build script for deployment
- `DEPLOYMENT.md` - This file

### 3. Updated Files
- `requirements.txt` - Added PostgreSQL driver and environment management packages
- `config/settings.py` - Production-ready configuration with security settings
- `.gitignore` - Added Vercel and additional files

### 4. Dependencies Added
- `psycopg2-binary` - PostgreSQL adapter for Python
- `dj-database-url` - Database URL parser
- `python-dotenv` - Environment variable management
- `django-cors-headers` - CORS support (optional, for frontend-backend separation)

## Deployment Steps

### Step 1: Set Up PostgreSQL Database

You have several options:

#### Option A: Vercel + Neon (Recommended - Free tier available)
1. Go to https://neon.tech and create an account
2. Create a new project and database
3. Copy the connection string (format: `postgresql://user:password@host/database`)

#### Option B: Other PostgreSQL Providers
- ElephantSQL (https://www.elephantsql.com)
- Railway (https://railway.app)
- Heroku PostgreSQL (https://www.heroku.com)

#### Option C: Local Testing with PostgreSQL
```bash
# Install PostgreSQL locally
# Create a database and note the connection string
```

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

```
SECRET_KEY=<generate-a-secure-key>
DEBUG=False
ALLOWED_HOSTS=<your-domain>.vercel.app,<your-custom-domain>
DATABASE_URL=postgresql://user:password@host:port/database
CSRF_TRUSTED_ORIGINS=https://<your-domain>.vercel.app,https://<your-custom-domain>
```

**How to generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 3: Connect GitHub Repository to Vercel

1. Push all changes to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. In Vercel dashboard:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will detect Django automatically
   - Configure environment variables in the project settings
   - Click "Deploy"

### Step 4: Verify Deployment

After deployment:

1. **Check Deployment Status**
   - Vercel dashboard shows real-time build logs
   - Ensure build completes without errors

2. **Verify Application**
   - Visit your deployment URL
   - Test navigation and core functionality
   - Check browser console for errors

3. **Database Migrations**
   - Vercel runs migrations automatically during build
   - Check Vercel logs if migrations fail
   - If needed, manually run: `vercel env pull` then `python manage.py migrate`

### Step 5: Set Up Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Issue: Build Fails with Database Error
**Solution**: Ensure `DATABASE_URL` environment variable is set correctly in Vercel settings.

### Issue: Static Files Not Loading
**Solution**: WhiteNoise is already configured. Ensure `STATIC_ROOT` permissions are correct.

### Issue: Media Files Not Persisting
**Solution**: Vercel doesn't have persistent storage. Use cloud storage:
- AWS S3
- Google Cloud Storage
- Cloudinary
- DigitalOcean Spaces

For development, local media files work fine.

### Issue: CSRF Token Errors
**Solution**: 
1. Verify `CSRF_TRUSTED_ORIGINS` is set to your domain
2. Check that cookies are being sent (browser DevTools → Application → Cookies)
3. Ensure DEBUG is False in production

### Issue: Secret Key Errors
**Solution**: The default key is for development only. Generate and set a production key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Issue: 502 Bad Gateway Errors
**Solution**:
1. Check Vercel function logs for errors
2. Ensure database connection is working
3. Verify environment variables are set correctly
4. Check memory limit (currently 3008MB in vercel.json)

## Performance Optimization

### For Better Performance:

1. **Enable Caching** (already in views.py)
   - Views use `@cache_page` decorator
   - Cache timeout: 15 minutes

2. **Database Connection Pooling**
   - Already configured in settings.py
   - `conn_max_age=600` for connection pooling

3. **Static File Optimization**
   - WhiteNoise compresses static files
   - Uses GZip compression automatically

4. **Image Optimization**
   - Consider using CDN for images
   - Cloudinary integration (optional)

## Monitoring

### Recommended Tools:
1. **Vercel Analytics** - Built-in performance monitoring
2. **Sentry** - Error tracking (optional integration)
3. **LogRocket** - Session replay (optional)

## Local Development Setup

After cloning from GitHub:

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file locally
cp .env.example .env

# Edit .env with your local settings
# For local development, you can use SQLite

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

## Security Checklist

- [x] DEBUG = False in production
- [x] SECRET_KEY generated and stored securely
- [x] ALLOWED_HOSTS configured correctly
- [x] CSRF_TRUSTED_ORIGINS configured for your domain
- [x] SSL/HTTPS enforced in production
- [x] Secure cookie settings enabled
- [x] Database credentials in environment variables (not in code)
- [x] Static files served by WhiteNoise
- [x] Security headers configured

## Rollback Procedure

If something goes wrong:

1. **Vercel Automatic Rollback**
   - Go to Deployments tab
   - Click on previous successful deployment
   - Click "Redeploy"

2. **Manual Rollback**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

## Additional Resources

- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [Vercel Python Runtime](https://vercel.com/docs/functions/runtimes/python)
- [Neon PostgreSQL](https://neon.tech)
- [WhiteNoise Documentation](http://whitenoise.evans.io/)

## Support

For issues:
1. Check Vercel logs in the dashboard
2. Review deployment configuration
3. Verify environment variables
4. Check GitHub repository for latest changes

---

**Last Updated**: 2024
**Project**: Apex Construction
**Deployment Platform**: Vercel
