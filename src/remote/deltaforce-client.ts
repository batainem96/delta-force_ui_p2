import axios from 'axios';

export const deltaforceClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});
