## Webpack Setup

Install node modules:

    npm install

Run the webpack devserver which will watch and compile all jsx files when they are changed.
It will also hot reload, so eany time you make a change to a jsx file, you don't have to reload the page to get the changes, it will change automatically for you.

    npm start

## production local.py template

```DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'leagion.sqlite3',
    }
}

SECRET_KEY = 'ranDomstRingHere'
DEBUG = False

STATIC_ROOT = '/home/leagion/Leagion/static/'
MEDIA_ROOT = '/home/leagion/Leagion/media/'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
```
