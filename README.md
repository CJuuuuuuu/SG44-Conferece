# SG44 研討會管理系統

第四十四屆測量及空間資訊研討會官方網站與管理系統

## 技術棧

- **前端**: Next.js 14 + React + TypeScript + Tailwind CSS
- **後端**: Django 5 + Django REST Framework
- **資料庫**: SQLite (開發) / PostgreSQL (生產)

## 開發環境設定

### 後端

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 前端

```bash
cd frontend
pnpm install
pnpm dev
```

## 授權

© 2025 SG44 籌備委員會
EOF
