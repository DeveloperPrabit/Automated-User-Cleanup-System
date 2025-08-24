from celery import shared_task
from django.utils import timezone
from django.conf import settings
from django.db.models import Q
from .models import User, CleanupReport
import logging

logger = logging.getLogger(__name__)

@shared_task
def cleanup_inactive_users():
    try:
        threshold_days = getattr(settings, 'INACTIVITY_THRESHOLD_DAYS', 30)
        cutoff_date = timezone.now() - timezone.timedelta(days=threshold_days)
        cutoff_date = cutoff_date.astimezone(timezone.utc)  # force UTC

        inactive_users = User.objects.filter(
            Q(last_login__lt=cutoff_date) | Q(last_login__isnull=True),
            is_active=True
        )

        users_deleted = inactive_users.count()

        if users_deleted > 0:
            inactive_users.update(is_active=False)

        active_users_remaining = User.objects.filter(is_active=True).count()

        report = CleanupReport.objects.create(
            users_deleted=users_deleted,
            active_users_remaining=active_users_remaining
        )

        logger.info(
            f"Cleanup completed: {users_deleted} users deactivated, "
            f"{active_users_remaining} active users remaining"
        )

        return {
            'report_id': report.id,
            'users_deleted': users_deleted,
            'active_users_remaining': active_users_remaining
        }

    except Exception as e:
        logger.error(f"Cleanup task failed: {str(e)}")
        raise
