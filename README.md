# Ka'sam Construction Enterprise

Ka'sam Construction Enterprise is a Django-based website for a construction company. The project includes:

- Services, projects, team members, testimonials, and machine hire models
- A contact page with message and consultation forms
- Dynamic templates powered by Django views and models
- Static assets for CSS and JavaScript
- **Production-ready for Vercel deployment**

## Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- pip
- Virtual environment support

### Setup

1. Create and activate a Python virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```powershell
   copy .env.example .env
   ```
   
   For local development, the defaults work fine.

4. Apply database migrations:
   ```powershell
   python manage.py migrate
   ```

5. Create a superuser (admin account):
   ```powershell
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```powershell
   python manage.py runserver
   ```

7. Open the site in your browser at `http://127.0.0.1:8000/`

## Project Structure

```
apex-construction/
├── apex/                      # Main Django app
│   ├── models.py             # Database models
│   ├── views.py              # View logic
│   ├── urls.py               # URL routing
│   ├── forms.py              # Form definitions
│   ├── templates/            # HTML templates
│   └── migrations/           # Database migrations
├── config/                    # Django configuration
│   ├── settings.py           # Settings (production-ready)
│   ├── urls.py               # Main URL configuration
│   ├── wsgi.py               # WSGI application
│   └── asgi.py               # ASGI application
├── static/                    # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                     # User-uploaded files
├── api/                       # Vercel serverless function
│   └── index.py              # Serverless handler
├── vercel.json               # Vercel configuration
├── runtime.txt               # Python version for deployment
└── requirements.txt          # Python dependencies
```

## Deployment to Vercel

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Add environment variables (see DEPLOYMENT.md)
   - Deploy!

### Required Environment Variables for Vercel:
- `SECRET_KEY` - Django secret key
- `DEBUG` - Set to `False`
- `ALLOWED_HOSTS` - Your domain
- `DATABASE_URL` - PostgreSQL connection string
- `CSRF_TRUSTED_ORIGINS` - Your domain for CSRF protection

## Key Features

- ✅ **Production-Ready**: Configured for Vercel serverless deployment
- ✅ **Database**: SQLite (dev) or PostgreSQL (production)
- ✅ **Static Files**: WhiteNoise for optimized delivery
- ✅ **Security**: Security headers, HTTPS, CSRF protection
- ✅ **Caching**: View caching for performance
- ✅ **Responsive**: Bootstrap 5 integration with Crispy Forms

## Development Commands

```powershell
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Create migrations for changes
python manage.py makemigrations

# Collect static files
python manage.py collectstatic --noinput

# Access Django admin
# Navigate to http://127.0.0.1:8000/admin/
```

## Technologies Used

- **Framework**: Django 4.2+
- **Database**: SQLite (dev), PostgreSQL (production)
- **Frontend**: Bootstrap 5, Crispy Forms
- **Deployment**: Vercel
- **Static Files**: WhiteNoise

## Notes

- The project uses WhiteNoise for optimized static file handling
- All security settings are configured for production
- Database migrations run automatically on deployment
- Debug mode is disabled in production

## Troubleshooting

If you encounter issues:

1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment-specific issues
2. Verify environment variables are set correctly
3. Check the Vercel logs in your dashboard
4. Ensure all dependencies are installed: `pip install -r requirements.txt`

## License

This project is the property of Ka'sam Construction Enterprise
