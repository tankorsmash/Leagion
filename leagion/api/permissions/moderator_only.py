from leagion.api.permissions.admin_only import AdminOnlyPermission

class ModeratorOnlyPermission(AdminOnlyPermission):
    def has_permission(self, request, view):
        is_admin = super().has_permission(request,view)
        if is_admin:
            return True

        return request.user.is_moderator
