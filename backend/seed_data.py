import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rental_portal.settings')
django.setup()

from datetime import date, timedelta
from django.contrib.auth.models import User
from api.models import Amenity, Apartment, Booking

def seed_database():
    User.objects.filter(username='ashwini').delete()
    User.objects.filter(username='admin').delete()
    
    user = User.objects.create_user(username='ashwini', email='ashwini@example.com', password='ashwini1234')
    admin = User.objects.create_superuser(username='admin', email='admin@example.com', password='admin1234')

    Amenity.objects.all().delete()
    
    gym = Amenity.objects.create(name="Gym")
    pool = Amenity.objects.create(name="Swimming Pool")
    parking = Amenity.objects.create(name="Covered Parking")
    lift = Amenity.objects.create(name="Lift")
    power = Amenity.objects.create(name="Power Backup")
    cctv = Amenity.objects.create(name="CCTV Security")
    play_area = Amenity.objects.create(name="Children's Play Area")
    security = Amenity.objects.create(name="24x7 Security")

    Apartment.objects.all().delete()

    apt1 = Apartment.objects.create(
        title="Palm Grove Residency",
        location="Whitefield",
        rent=35000.00,
        bhk=3,
        description="Spacious 3 BHK near IT parks with covered parking and modern amenities.",
        is_available=True
    )
    apt1.image.name = "apartments/whitefield.jpg"
    apt1.save()
    apt1.amenities.add(gym, parking, lift, power, security)

    apt2 = Apartment.objects.create(
        title="Oak Residency",
        location="Electronic City",
        rent=22000.00,
        bhk=2,
        description="Modern apartment close to tech hubs. Family-friendly with good ventilation.",
        is_available=True
    )
    apt2.image.name = "apartments/electronic.jpg"
    apt2.save()
    apt2.amenities.add(pool, gym, parking, lift, cctv)

    apt3 = Apartment.objects.create(
        title="Sunrise Apartments",
        location="Bellandur",
        rent=45000.00,
        bhk=3,
        description="Luxury high-rise facing the lake. Ideal for executives looking for premium living.",
        is_available=False
    )
    apt3.image.name = "apartments/bellandur.jpg"
    apt3.save()
    apt3.amenities.add(gym, pool, parking, lift, power, play_area, security)

    apt4 = Apartment.objects.create(
        title="Green Meadows",
        location="HSR Layout",
        rent=18000.00,
        bhk=1,
        description="Cozy 1 BHK suitable for working professionals. Tree-lined street and peaceful neighborhood.",
        is_available=True
    )
    apt4.image.name = "apartments/hsr.jpg"
    apt4.save()
    apt4.amenities.add(parking, lift, security)

    apt5 = Apartment.objects.create(
        title="Urban Nest",
        location="Koramangala",
        rent=28000.00,
        bhk=2,
        description="Well-maintained 2 BHK apartment near cafes and shopping areas. Fully secure.",
        is_available=True
    )
    apt5.image.name = "apartments/koramangala.jpg"
    apt5.save()
    apt5.amenities.add(gym, parking, lift, power, cctv)

    today = date.today()

    Booking.objects.create(
        user=user,
        apartment=apt1,
        start_date=today + timedelta(days=10),
        end_date=today + timedelta(days=375),
        status="pending"
    )
    
    Booking.objects.create(
        user=user,
        apartment=apt2,
        start_date=today + timedelta(days=5),
        end_date=today + timedelta(days=370),
        status="approved"
    )
    
    Booking.objects.create(
        user=user,
        apartment=apt3,
        start_date=today - timedelta(days=10),
        end_date=today + timedelta(days=355),
        status="rejected"
    )

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
