import axios from 'axios';

export const deltaforceClient = axios.create({
    baseURL: 'http://localhost:8080/deltaforce',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('api-token')
    }
});
