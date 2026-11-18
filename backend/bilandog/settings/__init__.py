"""
Settings package for bilandog project.

This module dynamically imports the appropriate settings module based on the
DJANGO_SETTINGS_MODULE environment variable.

Usage:
- Development: DJANGO_SETTINGS_MODULE=bilandog.settings.base (default)
- Production:  DJANGO_SETTINGS_MODULE=bilandog.settings.production
"""

import os
from importlib import import_module

# Default to base settings for development
settings_module = os.environ.get('DJANGO_SETTINGS_MODULE', 'bilandog.settings.base')

# Import the selected settings module
settings = import_module(settings_module)

# Expose all settings as module attributes
for setting in dir(settings):
    if setting.isupper():
        globals()[setting] = getattr(settings, setting)