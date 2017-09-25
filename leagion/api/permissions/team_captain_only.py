from leagion.api.permissions.moderator_only import ModeratorOnlyPermission

class TeamCaptainOnlyPermission(ModeratorOnlyPermission):
    """
    checks if the user is captain of any team, if they're not an moderator or an admin
    """
    def has_permission(self, request, view):
        is_moderator = super().has_permission(request,view)
        if is_moderator:
            return True

        return request.user.teams_captained.all().exists()


class IsCaptainOfTeamObjectPermission(ModeratorOnlyPermission):
    """
    checks if the user is captain of the specific team
    """
    def has_object_permission(self, request, view, team):
        return team.team_captains(id__contains=request.user.id)
