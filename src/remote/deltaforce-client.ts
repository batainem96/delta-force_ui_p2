import axios from 'axios';

export const deltaforceClient = axios.create({
    baseURL: 'http://localhost:5000/deltaforce',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('api-token')
    }
});
