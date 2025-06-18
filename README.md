# Item Management System

A full-stack web application with Django REST API backend and React frontend for managing items with groups.


## Backend Setup (Django)

### 1. Create Virtual Environment

```bash
# Navigate to project directory
cd mychoice_take_home

# Create virtual environment
python3 -m venv venv

# Activate virtual environment (macOS/Linux):
source venv/bin/activate
```

### 2. Install dependencies if needed

```bash
pip install django djangorestframework django-cors-headers
```

### 3. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Start Django Server

```bash
python manage.py runserver
```

The Django API will be available at: **http://127.0.0.1:8000/**

## Frontend Setup (React)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start React Development Server

```bash
npm start
```

The React app will be available at: **http://localhost:3000/**

## API Endpoints

GET /items/ - get all items
POST /items/ - create item  
GET /items/{id}/ - get one item
PATCH /items/{id}/ - update item

