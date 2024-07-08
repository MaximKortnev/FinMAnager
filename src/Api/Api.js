import axios from 'axios';

const API_URL = 'https://localhost:7282';

export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/GetAllTransactions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};