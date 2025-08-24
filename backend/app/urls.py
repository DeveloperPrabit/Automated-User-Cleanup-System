from django.urls import path
from . import views

urlpatterns = [
    path('reports/latest/', views.LatestCleanupReportView.as_view(), name='latest-report'),
    path('reports/', views.CleanupReportListView.as_view(), name='all-reports'),  # Add this line
    path('cleanup/trigger/', views.trigger_cleanup, name='trigger-cleanup'),
]