# Deploying to PythonAnywhere

This project is prepared for a simple PythonAnywhere free-tier deploy using a
single Django web app:

- Django serves the API at `/api/`
- Django serves the built React frontend at `/`
- Static frontend files are collected with `collectstatic`

## Node.js / npm on PythonAnywhere

PythonAnywhere **does not ship `npm` or `node` in PATH**. You install Node yourself (recommended: **[nvm](https://github.com/nvm-sh/nvm)**).

Use a **Bash** console—not IPython.

### One-time: install nvm + Node LTS

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
node -v
npm -v
```

After this, **new consoles** load nvm from `~/.bashrc`; if `npm` is still “not found”, run the two `export` / `. "$NVM_DIR/nvm.sh"` lines once in that session.

**Install gotcha:** the install command must end with **`| bash`** on the **same line** as `curl` (don't press Enter until the full line is pasted). Example:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

### Bash reminders (Linux console)

| Wrong | Correct |
|--------|---------|
| `cd..` | `cd ..` (space before `..`) |
| `npm runbuild` | `npm run build` (space between `run` and `build`) |

### Build the React app (`frontend/dist` is gitignored)

From your project root (adjust `Portfolio` if your folder name differs):

```bash
cd ~/Portfolio/frontend
npm ci        # uses package-lock.json; or `npm install` if ci fails
npm run build
cd ..
source venv/bin/activate   # optional; collectstatic uses Django from venv when active
python manage.py collectstatic --noinput
```

Then **Web tab → Reload**.

**Alternative:** Run `npm run build` **on your PC**, then upload the whole `frontend/dist` folder via **Files / SFTP** to the matching path on the server. You must repeat that whenever the frontend changes.

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

Recommended `.env` values (use your PythonAnywhere username in place of `yourusername`):

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourusername.pythonanywhere.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://yourusername.pythonanywhere.com
CORS_ALLOWED_ORIGINS=
```

If `DJANGO_ALLOWED_HOSTS` is missing or blank, or you list only explicit hosts in `.env`, `config/settings.py` **always merges** `127.0.0.1`, `localhost`, and **`.pythonanywhere.com`** (so any `*.pythonanywhere.com` site label works). Either **remove** the `DJANGO_ALLOWED_HOSTS=` line from `.env` or set your full hostname—you should not see `DisallowedHost` once you **pull latest `main`** and reload the web app.

**Always** set `DJANGO_CSRF_TRUSTED_ORIGINS=https://yourusername.pythonanywhere.com` in production (`DEBUG=False`) so the contact form and other POSTs are not rejected for CSRF.
5. Run Django setup commands:

Before **`collectstatic`**, **`frontend/dist`** must exist ([build on the server with Node](#nodejs--npm-on-pythonanywhere) or upload `dist`). Otherwise Django will only collect Django/staticfiles without the SPA.

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

## Contact form notifications (optional, Gmail SMTP)

[Gmail SMTP](https://support.google.com/mail/answer/7126229) is free for typical personal-volume mail; Google applies normal sending limits. On **PythonAnywhere free tier**, SMTP to **`smtp.gmail.com`** is the usual supported path—other SMTP hosts may be blocked.

1. In your Google Account, enable **2-Step Verification** (if needed) and create an **App password** for “Mail”.
2. In your PythonAnywhere **`.env`** (same folder as `manage.py`), set:

```env
DJANGO_EMAIL_HOST=smtp.gmail.com
DJANGO_EMAIL_PORT=587
DJANGO_EMAIL_USE_TLS=True
DJANGO_EMAIL_HOST_USER=alpieguevarra.dev@gmail.com
DJANGO_EMAIL_HOST_PASSWORD=your-16-character-app-password
DJANGO_DEFAULT_FROM_EMAIL=alpieguevarra.dev@gmail.com
CONTACT_NOTIFICATION_TO=alpieguevarra.dev@gmail.com
```

3. Reload the web app.

If these variables are **missing**, submissions are still saved in the database exactly as before; no email is sent.

## Final Step

Press **Reload** for the web app.

Your site should then be available at:

```text
https://yourusername.pythonanywhere.com/
```

## Updating After Changes (PythonAnywhere, after every `git pull`)

Run these from a **Bash console**—replace `<your-repo-name>` and **`yourusername`** with yours.

```bash
cd /home/yourusername/<your-repo-name>
git pull

source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

Then:

1. **Web tab → Reload** your site (needed so Django picks up code and env changes).

**If `requirements.txt` did not change**, you can skip `pip install -r requirements.txt`.

**`.env`** is not stored in Git. After the first clone you create it once (`cp .env.example .env`); after a pull you only edit **`.env`** when new variables appear in **`.env.example`** (for example Gmail SMTP). Never commit passwords.

If the **frontend** changed, rebuild **`frontend/dist`** on PythonAnywhere (see **[Node.js / npm on PythonAnywhere](#nodejs--npm-on-pythonanywhere)**) or upload a PC-built **`dist`** folder, then run **`collectstatic`** and **Reload** the web app.
