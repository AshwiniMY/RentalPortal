from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Amenity, Apartment, Booking


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']


class ApartmentSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)
    amenity_ids = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(),
        many=True,
        write_only=True,
        required=False
    )

    class Meta:
        model = Apartment
        fields = [
            'id', 'title', 'location', 'rent', 'bhk',
            'description', 'image', 'is_available',
            'amenities', 'amenity_ids'
        ]

    def create(self, validated_data):
        amenity_ids = validated_data.pop('amenity_ids', [])
        apartment = Apartment.objects.create(**validated_data)
        apartment.amenities.set(amenity_ids)
        return apartment

    def update(self, instance, validated_data):
        amenity_ids = validated_data.pop('amenity_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if amenity_ids is not None:
            instance.amenities.set(amenity_ids)
        return instance


class BookingSerializer(serializers.ModelSerializer):
    apartment_title = serializers.CharField(source='apartment.title', read_only=True)
    apartment_location = serializers.CharField(source='apartment.location', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'apartment', 'apartment_title', 'apartment_location',
            'user', 'username', 'start_date', 'end_date',
            'status', 'created_at'
        ]
        read_only_fields = ['user', 'status', 'created_at']
