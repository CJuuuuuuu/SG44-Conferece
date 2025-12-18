# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'is_reviewer', 'is_academic_staff', 'is_staff']
    list_filter = ['is_reviewer', 'is_academic_staff', 'is_staff', 'is_superuser']
    
    fieldsets = UserAdmin.fieldsets + (
        ('額外資訊', {'fields': ('phone', 'institution', 'is_reviewer', 'is_academic_staff')}),
    )
