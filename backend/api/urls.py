from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('me/', views.get_current_user),

    path('apartments/', views.apartment_list),
    path('apartments/<int:pk>/', views.apartment_detail),
    path('bookings/', views.create_booking),
    path('my-bookings/', views.my_bookings),

    path('admin/stats/', views.admin_dashboard_stats),
    path('admin/apartments/', views.admin_apartment_list),
    path('admin/apartments/<int:pk>/', views.admin_apartment_detail),
    path('admin/amenities/', views.admin_amenity_list),
    path('admin/amenities/<int:pk>/', views.admin_amenity_detail),
    path('admin/bookings/', views.admin_booking_list),
    path('admin/bookings/<int:pk>/', views.admin_booking_detail),
]
