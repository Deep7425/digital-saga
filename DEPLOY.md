# Deploying Digital Saga to digitalsaga.in (VPS, same-domain `/api`)

Architecture in production:

- **Website** (`dist/`, static React build) served at `https://digitalsaga.in`
- **Laravel API** (`api/`) served at `https://digitalsaga.in/api`
- **MySQL** database `digital_saga`

The React app already calls `/api/...` on the same origin, so the frontend needs
no code change — only a production build and correct server config.

---

## 1. Server prerequisites (one-time)

On the VPS (Ubuntu example):

```bash
sudo apt update
sudo apt install -y nginx mysql-server \
  php8.2-fpm php8.2-cli php8.2-mysql php8.2-mbstring php8.2-xml \
  php8.2-curl php8.2-zip php8.2-bcmath unzip git

# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Node (only needed to build the frontend — can also build locally and upload dist/)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Requirements: **PHP 8.2+** (Laravel 11), **MySQL 8**, **Node 18+** to build.

---

## 2. Create the database

```bash
sudo mysql
```
```sql
CREATE DATABASE digital_saga CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ds_user'@'localhost' IDENTIFIED BY 'a-strong-password';
GRANT ALL PRIVILEGES ON digital_saga.* TO 'ds_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 3. Upload the project

Put it at `/var/www/digitalsaga`, so you have:

```
/var/www/digitalsaga/
  api/        <- Laravel
  client/     <- React source
  dist/       <- built frontend (created in step 5)
```

Do **not** upload `node_modules/` or `api/vendor/` — regenerate them on the server.

---

## 4. Configure & install the Laravel API

```bash
cd /var/www/digitalsaga/api
cp .env.production.example .env     # then edit .env with real values
composer install --no-dev --optimize-autoloader
php artisan key:generate            # fills APP_KEY
php artisan migrate --force         # creates tables
php artisan db:seed --force         # creates admin user + seeds portfolios/services
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

In `.env`, the must-change values (see `api/.env.production.example`):
`APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://digitalsaga.in`,
real `DB_*`, strong `ADMIN_PASSWORD`, real `MAIL_*`,
`SANCTUM_STATEFUL_DOMAINS=digitalsaga.in,www.digitalsaga.in`.

> Note: the original local `.env` had `DB_DATABASE= digital_saga` with a leading
> space — make sure there is **no space** after the `=`.

Permissions (Nginx/PHP-FPM run as `www-data`):

```bash
sudo chown -R www-data:www-data /var/www/digitalsaga/api/storage /var/www/digitalsaga/api/bootstrap/cache
sudo chmod -R 775 /var/www/digitalsaga/api/storage /var/www/digitalsaga/api/bootstrap/cache
```

---

## 5. Build the frontend

Build with `VITE_API_URL` **empty** so the app uses same-origin `/api`:

```bash
cd /var/www/digitalsaga
npm install
npm run build        # outputs to dist/
```

(You can build on your laptop instead and upload only the resulting `dist/`.)

---

## 6. Nginx — serve site + route `/api` to Laravel

The simplest reliable single-server-block setup: copy the built site into Laravel's
`public/` folder so there is one document root.

```bash
cp -r /var/www/digitalsaga/dist/* /var/www/digitalsaga/api/public/
```

Create `/etc/nginx/sites-available/digitalsaga`:

```nginx
server {
    listen 80;
    server_name digitalsaga.in www.digitalsaga.in;

    root /var/www/digitalsaga/api/public;
    index index.html index.php;

    # Laravel API and any PHP -> front controller
    location /api {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # React SPA: serve static asset, else fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.(?!well-known).* { deny all; }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/digitalsaga /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

> Re-deploying the frontend later = `npm run build` then re-copy `dist/*` into
> `api/public/`. (If you prefer keeping `dist/` separate from Laravel, that's
> possible too but needs a more involved Nginx config — the copy approach is the
> least error-prone.)

---

## 7. HTTPS (free, required for production)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d digitalsaga.in -d www.digitalsaga.in
```

Certbot rewrites the Nginx block to listen on 443 and redirect 80 → 443.
After SSL is on, keep `SESSION_SECURE_COOKIE=true` in `.env`.

---

## 8. DNS

Point the domain at the server:

- `A` record `digitalsaga.in` → your VPS public IP
- `A` record `www` → same IP

---

## 9. Verify

- `https://digitalsaga.in` loads the site
- `https://digitalsaga.in/api/services` returns JSON
- `https://digitalsaga.in/admin` → log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- Submit the contact form, confirm it appears under admin → contacts

---

## Re-deploy checklist (after code changes)

```bash
cd /var/www/digitalsaga
git pull                       # or re-upload
cd api && composer install --no-dev -o
php artisan migrate --force
php artisan config:cache && php artisan route:cache
cd .. && npm run build && cp -r dist/* api/public/
sudo systemctl reload php8.2-fpm nginx
```

## Security checklist before go-live

- [ ] `APP_DEBUG=false`
- [ ] Strong `ADMIN_PASSWORD` and DB password (not the defaults)
- [ ] Fresh `APP_KEY` generated on the server
- [ ] HTTPS active, HTTP redirects to HTTPS
- [ ] `api/.env`, `api/vendor`, `node_modules` not web-accessible (they aren't,
      since doc root is `api/public`)
