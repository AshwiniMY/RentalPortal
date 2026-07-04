import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rental_portal.settings')
django.setup()

import urllib.request
from datetime import date, timedelta
from django.conf import settings
from django.contrib.auth.models import User
from api.models import Amenity, Apartment, Booking
from django.core.files import File

def seed():
    # 1. Users
    user, _ = User.objects.get_or_create(username='ashwini', email='ashwini@example.com')
    if not user.has_usable_password():
        user.set_password('ashwini1234')
        user.save()
    
    admin, _ = User.objects.get_or_create(username='admin', email='admin@example.com')
    admin.is_staff = True
    admin.is_superuser = True
    if not admin.has_usable_password():
        admin.set_password('admin1234')
    admin.save()
        
    print("Users created/verified.")

    # 2. Amenities
    amenity_names = [
        "Gym", "Swimming Pool", "Covered Parking", 
        "Lift", "Power Backup", "CCTV Security", 
        "Children's Play Area", "24x7 Security"
    ]
    amenities = {}
    for name in amenity_names:
        a, _ = Amenity.objects.get_or_create(name=name)
        amenities[name] = a
        
    print("Amenities created.")

    # Clear old data to cleanly re-seed with real images
    Apartment.objects.all().delete()
    print("Cleared old apartments.")

    # 3. Apartments
    media_apt_dir = os.path.join(settings.MEDIA_ROOT, 'apartments')
    os.makedirs(media_apt_dir, exist_ok=True)
    
    apt_data = [
        {
            "title": "Palm Grove Residency",
            "location": "Whitefield",
            "rent": 35000.00,
            "bhk": 3,
            "description": "Spacious 3 BHK near IT parks with covered parking and modern amenities.",
            "is_available": True,
            "filename": "whitefield.jpg",
            "amenities": ["Gym", "Covered Parking", "Lift", "Power Backup", "24x7 Security"]
        },
        {
            "title": "Oak Residency",
            "location": "Electronic City",
            "rent": 22000.00,
            "bhk": 2,
            "description": "Modern apartment close to tech hubs. Family-friendly with good ventilation.",
            "is_available": True,
            "filename": "electronic.jpg",
            "amenities": ["Swimming Pool", "Gym", "Covered Parking", "Lift", "CCTV Security"]
        },
        {
            "title": "Sunrise Apartments",
            "location": "Bellandur",
            "rent": 45000.00,
            "bhk": 3,
            "description": "Luxury high-rise facing the lake. Ideal for executives looking for premium living.",
            "is_available": False,
            "filename": "bellandur.jpg",
            "amenities": ["Gym", "Swimming Pool", "Covered Parking", "Lift", "Power Backup", "Children's Play Area", "24x7 Security"]
        },
        {
            "title": "Green Meadows",
            "location": "HSR Layout",
            "rent": 18000.00,
            "bhk": 1,
            "description": "Cozy 1 BHK suitable for working professionals. Tree-lined street and peaceful neighborhood.",
            "is_available": True,
            "filename": "hsr.jpg",
            "amenities": ["Covered Parking", "Lift", "24x7 Security"]
        },
        {
            "title": "Urban Nest",
            "location": "Koramangala",
            "rent": 28000.00,
            "bhk": 2,
            "description": "Well-maintained 2 BHK apartment near cafes and shopping areas. Fully secure.",
            "is_available": True,
            "filename": "koramangala.jpg",
            "amenities": ["Gym", "Covered Parking", "Lift", "Power Backup", "CCTV Security"]
        },
    ]

    apartments_objs = []
    for data in apt_data:
        # Create apartment
        apt = Apartment.objects.create(
            title=data["title"],
            location=data["location"],
            rent=data["rent"],
            bhk=data["bhk"],
            description=data["description"],
            is_available=data["is_available"]
        )
        
        # Link to the existing images in media/apartments/
        apt.image.name = f"apartments/{data['filename']}"
        apt.save()
        print(f"Linked existing image for {data['title']}")
            
        # Add amenities
        for am_name in data["amenities"]:
            apt.amenities.add(amenities[am_name])
            
        apartments_objs.append(apt)

    print("Apartments created.")

    # 4. Bookings
    today = date.today()
    Booking.objects.get_or_create(
        user=user,
        apartment=apartments_objs[0], # Palm Grove
        defaults={
            "start_date": today + timedelta(days=10),
            "end_date": today + timedelta(days=375),
            "status": "pending"
        }
    )
    
    Booking.objects.get_or_create(
        user=user,
        apartment=apartments_objs[1], # Oak Residency
        defaults={
            "start_date": today + timedelta(days=5),
            "end_date": today + timedelta(days=370),
            "status": "approved"
        }
    )
    
    Booking.objects.get_or_create(
        user=user,
        apartment=apartments_objs[2], # Sunrise
        defaults={
            "start_date": today - timedelta(days=10),
            "end_date": today + timedelta(days=355),
            "status": "rejected"
        }
    )

    print("Bookings created.")

seed()
