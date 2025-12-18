# config/settings.py
import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='your-secret-key-for-development')

DEBUG = config('DEBUG', default=False, cast=bool)

# 允許的主機
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.zeabur.app',  # 允許所有 Zeabur 子網域
    config('ALLOWED_HOST', default=''),
]

# Application definition
INSTALLED_APPS = [
    'unfold',  # ← Unfold 必須在 admin 之前
    'unfold.contrib.filters',  # 可選：進階過濾器
    'unfold.contrib.forms',    # 可選：表單增強
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # 第三方套件
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    
    # 自訂應用
    'users',
    'conferences',
    'submissions',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'config.wsgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'zh-hant'
TIME_ZONE = 'Asia/Taipei'
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 自訂 User 模型
AUTH_USER_MODEL = 'users.User'

# REST Framework 設定
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# JWT 設定
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# CORS 設定
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

# 如果有前端網址環境變數，加入允許清單
frontend_url = config('FRONTEND_URL', default=None)
if frontend_url:
    CORS_ALLOWED_ORIGINS.append(frontend_url)

# Database
# 預設使用 SQLite（本地開發）
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 如果有 Zeabur 的 PostgreSQL 環境變數，則使用它
postgres_url = config('POSTGRES_CONNECTION_STRING', default=None)
if postgres_url:
    DATABASES['default'] = dj_database_url.parse(
        postgres_url,
        conn_max_age=600,
        conn_health_checks=True,
    )

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# 生產環境安全設定
if not DEBUG:
    # 信任 Zeabur 的反向代理 HTTPS 標頭
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # Cookie 安全設定
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    
    # 瀏覽器安全設定
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'


# ==================== Unfold Admin 設定 ====================

UNFOLD = {
    "SITE_TITLE": "SG44 會議管理",
    "SITE_HEADER": "SG44 Conference",
    "SITE_URL": "/",
    
    "SITE_SYMBOL": "speed",  # Google Material Icon
    
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    
    "THEME": "light",  # light 或 dark
    
    # 自訂主色調（可選）
    "COLORS": {
        "primary": {
            "50": "239 246 255",
            "100": "219 234 254",
            "200": "191 219 254",
            "300": "147 197 253",
            "400": "96 165 250",
            "500": "59 130 246",
            "600": "37 99 235",
            "700": "29 78 216",
            "800": "30 64 175",
            "900": "30 58 138",
            "950": "23 37 84",
        },
    },
    
    # 側邊欄設定
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
    },
}
