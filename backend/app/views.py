# app/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CleanupReport
from .serializers import CleanupReportSerializer
from .tasks import cleanup_inactive_users

# ==========================
# Retrieve latest cleanup report
# ==========================
class LatestCleanupReportView(generics.RetrieveAPIView):
    queryset = CleanupReport.objects.all()
    serializer_class = CleanupReportSerializer
    
    def get_object(self):
        try:
            return CleanupReport.objects.latest('timestamp')
        except CleanupReport.DoesNotExist:
            return None
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response(
                {'detail': 'No cleanup reports available.'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# ==========================
# List all cleanup reports
# ==========================
class CleanupReportListView(generics.ListAPIView):
    queryset = CleanupReport.objects.all().order_by('-timestamp')
    serializer_class = CleanupReportSerializer

# ==========================
# Trigger cleanup task
# Works with GET (testing) and POST (production)
# ==========================
@api_view(['GET', 'POST'])
def trigger_cleanup(request):
    task = cleanup_inactive_users.delay()
    
    # Optional: return a simple message for GET, or detailed for POST
    return Response(
        {
            'message': 'Cleanup task triggered',
            'task_id': task.id,
            'method_used': request.method
        },
        status=status.HTTP_202_ACCEPTED
    )
