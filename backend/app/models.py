from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User model
class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        # Safely return email, fallback to User-ID if email is empty
        return self.email or f"User-{self.id}"
# Cleanup report model
class CleanupReport(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    users_deleted = models.IntegerField(default=0)
    active_users_remaining = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"Cleanup at {self.timestamp} - {self.users_deleted} users deleted"
