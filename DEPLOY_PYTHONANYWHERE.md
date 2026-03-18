# Deploying to PythonAnywhere

This project is prepared for a simple PythonAnywhere free-tier deploy using a
single Django web app:

- Django serves the API at `/api/`
- Django serves the built React frontend at `/`
- Static frontend files are collected with `collectstatic`

## Before You Push to GitHub

1. Build the frontend locally:

```powershell
cd frontend
npm run build
cd ..
```

2. Make sure these files are committed:

- `frontend/dist/`
- `.env.example`
- `frontend/.env.example`

The repo is already configured to allow `frontend/dist/` to be committed.

## PythonAnywhere Setup

1. Create a **Bash console**
2. Clone your repo:

```bash
git clone https://github.com/Guevarra-Alpie01/<your-repo-name>.git
cd <your-repo-name>
```

3. Create and activate a virtual environment:

```bash
python3.10 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

4. Create your production environment file:

```bash
cp .env.example .env
nano .env
```

Recommended `.env` values:

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourusername.pythonanywhere.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://yourusername.pythonanywhere.com
CORS_ALLOWED_ORIGINS=
```

5. Run Django setup commands:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## Web App Configuration

1. Go to the **Web** tab
2. Create a new web app
3. Choose **Manual configuration**
4. Choose the same Python version you used for the virtualenv

### Virtualenv

Set the virtualenv path to:

```text
/home/yourusername/<your-repo-name>/venv
```

### Source code

Set the source code path to:

```text
/home/yourusername/<your-repo-name>
```

### WSGI file

Edit the generated WSGI file so the path points to your project:

```python
import os
import sys

path = "/home/yourusername/<your-repo-name>"
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### Static files mapping

In the **Static files** section, add:

- URL: `/static/`
- Directory: `/home/yourusername/<your-repo-name>/staticfiles`

### Media files mapping

Optional, if you want uploaded media later:

- URL: `/media/`
- Directory: `/home/yourusername/<your-repo-name>/media`

## Final Step

Press **Reload** for the web app.

Your site should then be available at:

```text
https://yourusername.pythonanywhere.com/
```

## Updating After Changes

After pushing new commits to GitHub:

```bash
cd /home/yourusername/<your-repo-name>
git pull
source venv/bin/activate
python manage.py collectstatic --noinput
```

If frontend code changed, run `npm run build` inside `frontend/` locally first,
commit the updated `frontend/dist`, then push to GitHub before pulling on
PythonAnywhere.
