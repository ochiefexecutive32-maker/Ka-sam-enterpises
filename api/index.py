"""
Vercel serverless function handler for Django WSGI application
"""

import os
import sys
import django
from pathlib import Path

# Add the project directory to the Python path
project_dir = Path(__file__).parent.parent
sys.path.insert(0, str(project_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Setup Django
django.setup()

from django.core.wsgi import get_wsgi_application

# Get the WSGI application
app = get_wsgi_application()


def handler(request):
    """
    Vercel serverless function handler
    """
    return app(request)
