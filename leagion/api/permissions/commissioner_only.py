from rest_framework import permissions

class CommissionerOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_commissioner
