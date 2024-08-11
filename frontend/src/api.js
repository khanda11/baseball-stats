import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getTeams = async () => {
    const response = await axios.get(`${API_BASE_URL}/teams/`);
    return response.data;
};

export const getGames = async () => {
    const response = await axios.get(`${API_BASE_URL}/games/`);
    return response.data;
};

export const getBoxScores = async () => {
    const response = await axios.get(`${API_BASE_URL}/boxscores/`);
    return response.data;
};
