from rest_framework import status
from rest_framework.response import Response


class DeleteManyViewMixin:
    def post(self, request, *args, **kwargs):
        if request.data.get('delete'):
            ids = request.data.get('ids', [])
            objects = self.get_queryset().filter(id__in=ids)
            objects.delete()
            return Response('Objects successfully deleted', status=status.HTTP_200_OK)
        else:
            return super().post(request, *args, **kwargs)
