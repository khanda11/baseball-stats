import statsapi
from stats.models import Team, Player

def fetch_teams():
    print("Fetching teams...")
    try:
        teams_data = statsapi.get('teams', {'sportId': 1})['teams']
        print(f"Fetched {len(teams_data)} teams")
        print(teams_data)  # Add this line to inspect the data structure

        for team_data in teams_data:
            print(team_data)  # Print each team data to see its structure
            venue = team_data.get('venue', {})
            city = venue.get('city', 'Unknown')
            
            team, created = Team.objects.get_or_create(
                id=team_data['id'],
                defaults={'name': team_data['name'], 'city': city}
            )
            if created:
                print(f"Created team: {team.name}")
            else:
                team.name = team_data['name']
                team.city = city
                team.save()
                print(f"Updated team: {team.name}")
    except Exception as e:
        print(f"An error occurred while fetching teams: {e}")

def fetch_players():
    print("Fetching players...")
    try:
        teams = Team.objects.all()
        print(f"Found {teams.count()} teams in the database")

        for team in teams:
            print(f"Fetching roster for team: {team.name}")
            roster_data = statsapi.get('team_roster', {'teamId': team.id})['roster']
            
            for player_data in roster_data:
                person_data = player_data['person']
                position_data = player_data['position']
                player, created = Player.objects.get_or_create(
                    id=person_data['id'],
                    defaults={
                        'name': person_data['fullName'],
                        'team': team,
                        'position': position_data['abbreviation'],
                        'stats': {}
                    }
                )
                if created:
                    print(f"Created player: {player.name}")
                else:
                    player.name = person_data['fullName']
                    player.position = position_data['abbreviation']
                    player.save()
                    print(f"Updated player: {player.name}")
    except Exception as e:
        print(f"An error occurred while fetching players: {e}")

def fetch_all_data():
    print("Starting data fetch...")
    fetch_teams()
    fetch_players()
    print("Data fetch complete.")

if __name__ == "__main__":
    fetch_all_data()
