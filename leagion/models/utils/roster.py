from leagion.models import Roster, Batter


def get_or_create_roster(roster, team):
    if not roster:
        roster = Roster.objects.create(
            team=team,
        )

    players = team.players.all()
    batters = roster.batters.all()

    players_to_add = players.exclude(id__in=[batter.player.id for batter in batters])

    batters_to_add = []
    for i, player in enumerate(players_to_add):
        batters_to_add.append(Batter.generate_batter(roster, player, len(batters) + i))

    Batter.objects.bulk_create(batters_to_add)

    roster.save()

    return roster
