from django.db import models
from django.contrib.auth.models import User


class Amenity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Apartment(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    bhk = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='apartments/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    amenities = models.ManyToManyField(Amenity, blank=True)

    def __str__(self):
        return self.title


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.apartment.title}"
