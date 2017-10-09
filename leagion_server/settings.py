"""
Django settings for leagion_server project.

Generated by 'django-admin startproject' using Django 1.9.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_PATH = os.path.abspath(os.path.join('..', BASE_DIR))

DEBUG = TEMPLATE_DEBUG = False

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')3-^3j&1(0e35&ld30u&x-hw6rf*5^u2)y26&o*9u^m-o-dt09'

# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = ['138.197.169.179'] #we need to update this with whatever host we get on, otherwise django wont run

ADMINS = [('TankorSmash', 'tankorsmash@gmail.com'), ('Calvin', 'calvinkcollins@gmail.com')]

USER_DETAILS_SERIALIZER = 'leagion.api.serializers.UserSerializer'

# Application definition

INSTALLED_APPS = [
    'leagion',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'django_extensions',

    'rest_framework',
    'allauth',
    'allauth.account',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'webpack_loader',

    'phonenumber_field',
    'address',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'leagion_server.urls'

PHONENUMBER_DB_FORMAT='NATIONAL'
PHONENUMBER_DEFAULT_REGION="CA"
PHONENUMBER_DEFAULT_FORMAT="NATIONAL"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'leagion_server.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#for django rest auth
SITE_ID = 1

ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ),
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True
USE_L10N = True
USE_TZ = True

LOGIN_REDIRECT_URL = 'index'

STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(ROOT_PATH, 'media/')
MEDIA_URL = '/media/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets', 'bundles'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
)

# always include leagion.utils
SHELL_PLUS_PRE_IMPORTS = (
    ('leagion', ('utils',)),
    'faker',
    'humanize',
    'random',
    'pytz',
    'django'
)

# set auth user model to our own custom model
AUTH_USER_MODEL = 'leagion.User'

"""
sample DEFAULT_ADMIN_DATA to be implemented in local.py
 DEFAULT_ADMIN_DATA = {
    "email": "fake@mail.com",
    "password": "hunter12",
    "first_name": "John",
    "last_name": "Doe",
 }

this is used in generate_all to save on having to recreate a superuser all the time
"""

from .local import *

if DEBUG:
    #disable hardcore password hashing locally, makes generating users real slow
    PASSWORD_HASHERS = (
                'django.contrib.auth.hashers.MD5PasswordHasher',
                )
