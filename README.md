# Rental Portal

## Project Description

Rental Portal is a simple apartment booking application built using React and Django. Users can browse apartments, view apartment details, register, log in, and send booking requests. Admins can manage apartments, amenities, and approve or reject booking requests.

## Technologies Used

- React
- Tailwind CSS
- Python
- Django
- Django REST Framework
- PostgreSQL

## Project Structure

- **Frontend** – React
- **Backend** – Django
- **Database** – PostgreSQL

The frontend and backend communicate through REST APIs.

## Setup

```bash
git clone https://github.com/AshwiniMY/RentalPortal.git
cd RentalPortal
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Demo Credentials

**User**
- Username: ashwini
- Password: ashwini1234

**Admin**
- Username: admin
- Password: admin1234