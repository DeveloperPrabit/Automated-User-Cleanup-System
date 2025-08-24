from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, CleanupReport

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'username', 'last_login', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'username')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

@admin.register(CleanupReport)
class CleanupReportAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'users_deleted', 'active_users_remaining')
    readonly_fields = ('timestamp', 'users_deleted', 'active_users_remaining')
    
    def has_add_permission(self, request):
        return False
