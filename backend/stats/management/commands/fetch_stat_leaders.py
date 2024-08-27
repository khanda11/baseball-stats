import statsapi
from django.core.management.base import BaseCommand
from stats.models import StatLeader

class Command(BaseCommand):
    help = 'Fetches and inserts MLB stat leaders into the database for the last 10 years'

    def fetch_stat_leaders(self, category, group, year, limit=1):
        category_mapping = {
            'homeRuns': 'Home Runs',
            'rbi': 'RBIs',
            'battingAverage': 'Batting Average',
            'runs': 'Runs',
            'hits': 'Hits',
            'doubles': 'Doubles',
            'triples': 'Triples',
            'strikeOuts': 'Strikeouts',
            'baseOnBalls': 'Walks',
            'intentionalWalks': 'Intentional Walks',
            'stolenBases': 'Stolen Bases',
            'caughtStealing': 'Caught Stealing',
            'groundIntoDoublePlay': 'Grounded Into Double Play',
            'onBasePercentage': 'On-base Percentage',
            'sluggingPercentage': 'Slugging Percentage',
            'onBasePlusSlugging': 'OPS',
            'totalBases': 'Total Bases',
            'sacBunts': 'Sacrifice Bunts',
            'sacFlies': 'Sacrifice Flies',
            'atBats': 'At Bats',
            'plateAppearances': 'Plate Appearances',
            'extraBaseHits': 'Extra-base Hits',
            'gamesPlayed': 'Games Played',
            'wins': 'Wins',
            'losses': 'Losses',
            'earnedRunAverage': 'ERA',
            'saves': 'Saves',
            'inningsPitched': 'Innings Pitched',
            'whip': 'WHIP',
            'hitsAllowed': 'Hits Allowed',
            'runsAllowed': 'Runs Allowed',
            'earnedRuns': 'Earned Runs',
            'homeRunsAllowed': 'Home Runs Allowed',
            'walksAllowed': 'Walks Allowed',
            'hitBatters': 'Hit Batters',
            'completeGames': 'Complete Games',
            'shutouts': 'Shutouts',
            'holds': 'Holds',
            'blownSaves': 'Blown Saves',
            'numberOfPitches': 'Number of Pitches'
        }

        three_word_teams = [
            'Chicago White Sox', 'Los Angeles Angels', 'Los Angeles Dodgers',
            'New York Yankees', 'Kansas City Royals', 'New York Mets',
            'San Diego Padres', 'San Francisco Giants', 'St. Louis Cardinals',
            'Toronto Blue Jays', 'Tampa Bay Rays', 'Boston Red Sox'
        ]

        two_word_teams = [
            'Miami Marlins', 'Chicago Cubs',
            'Cleveland Guardians', 'Detroit Tigers', 'Houston Astros', 'Seattle Mariners',
            'Texas Rangers', 'Oakland Athletics', 'Baltimore Orioles', 'Minnesota Twins',
            'Philadelphia Phillies', 'Pittsburgh Pirates', 'Washington Nationals',
            'Arizona Diamondbacks', 'Colorado Rockies', 'Atlanta Braves', 
            'Milwaukee Brewers', 'Cincinnati Reds', 'Cleveland Indians', 'Montreal Expos', 'Florida Marlins'
        ]

        try:
            leaders_data = statsapi.league_leaders(leaderCategories=category, statGroup=group, limit=limit, season=str(year))
            print(f"Leaders data for {year}: {leaders_data}")

            if isinstance(leaders_data, str):
                lines = leaders_data.split('\n')[1:] 
                for line in lines:
                    if line.strip() == '':
                        continue
                    parts = line.split()
                    rank = parts[0]
                    value = parts[-1]

                    if ' '.join(parts[-4:-1]) in three_word_teams:
                        team = ' '.join(parts[-4:-1])
                        player_name = ' '.join(parts[1:-4])
                    elif ' '.join(parts[-3:-1]) in two_word_teams:
                        team = ' '.join(parts[-3:-1])
                        player_name = ' '.join(parts[1:-3])
                    else:
                        team = ' '.join(parts[-2:-1])
                        player_name = ' '.join(parts[1:-2])

                    try:
                        stat_value = float(value)
                    except ValueError:
                        stat_value = 0.0 
                    print(f"Parsed data - Year: {year}, Rank: {rank}, Player: {player_name}, Team: {team}, Value: {stat_value}")

                    StatLeader.objects.create(
                        player_name=player_name,
                        stat_category=category_mapping.get(category, category),
                        stat_value=stat_value,
                        season=str(year),
                        team=team
                    )
        except Exception as e:
            print(f"An error occurred: {e}")

    def handle(self, *args, **kwargs):
        hitting_categories = [
            'homeRuns', 'rbi', 'battingAverage', 'runs', 'hits', 'doubles', 
            'triples', 'strikeOuts', 'baseOnBalls', 'intentionalWalks', 'stolenBases', 
            'caughtStealing', 'groundIntoDoublePlay', 'onBasePercentage', 'sluggingPercentage', 
            'onBasePlusSlugging', 'totalBases', 'sacBunts', 'sacFlies', 
            'atBats', 'plateAppearances', 'extraBaseHits', 'gamesPlayed'
        ]

        pitching_categories = [
            'wins', 'losses', 'earnedRunAverage', 'saves', 'inningsPitched', 
            'strikeOuts', 'whip', 'hitsAllowed', 'runsAllowed', 'earnedRuns', 
            'homeRunsAllowed', 'walksAllowed', 'hitBatters', 'completeGames', 
            'shutouts', 'holds', 'blownSaves', 'numberOfPitches'
        ]

        current_year = 2023
        for year in range(current_year, current_year - 50, -1):
            for category in hitting_categories:
                self.fetch_stat_leaders(category, 'hitting', year)
            
            for category in pitching_categories:
                self.fetch_stat_leaders(category, 'pitching', year)

        self.stdout.write(self.style.SUCCESS('Successfully fetched and inserted MLB stat leaders for the last 10 years'))


