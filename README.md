# Rental Portal

## Project Description

Rental Portal is a simple apartment booking application built using React and Django. Users can browse apartments, view apartment details, register, log in, and send booking requests. Admins can manage apartments, amenities, and approve or reject booking requests.

---

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL

## Project Structure

- **frontend** – React application
- **backend** – Django application 
- **database** - PostgreSQL
The frontend and backend communicate through REST APIs.
---

## Setup Instructions

```bash
git clone https://github.com/yourusername/rental-portal.git
cd rental-portal
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Database Setup

Install PostgreSQL and create a database named:

```
rental_portal
```

Update the PostgreSQL username and password in the Django database settings if required.

### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
python seed_data.py
```

```bash
python manage.py runserver
```

The backend will run at:
```
http://127.0.0.1:8000
```

### Frontend Setup

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:
```
http://localhost:5173
```

---

## Demo Credentials

### User

Username: **ashwini**

Password: **ashwini1234**

### Admin

Username: **admin**

Password: **admin1234**