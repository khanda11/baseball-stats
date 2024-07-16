import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get('/api/players/')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the player data!", error);
            });
    }, []);

    return (
        <div>
            <h1>Player Stats</h1>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        <h2>{player.name} ({player.position})</h2>
                        <p>Team: {player.team}</p>
                        <p>Games Played: {player.games_played}</p>
                        <p>Runs: {player.runs}</p>
                        <h3>Batting Stats:</h3>
                        <p>At Bats: {player.stats.batting?.at_bats}</p>
                        <p>Hits: {player.stats.batting?.hits}</p>
                        <p>Home Runs: {player.stats.batting?.home_runs}</p>
                        <p>RBIs: {player.stats.batting?.rbis}</p>
                        <p>Batting Average: {player.stats.batting?.batting_average}</p>
                        <h3>Pitching Stats:</h3>
                        <p>Wins: {player.stats.pitching?.wins}</p>
                        <p>Losses: {player.stats.pitching?.losses}</p>
                        <p>ERA: {player.stats.pitching?.era}</p>
                        <p>Strikeouts: {player.stats.pitching?.strikeouts}</p>
                        <p>Innings Pitched: {player.stats.pitching?.innings_pitched}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;
