import axios from 'axios';

export const deltaforceClient = axios.create({
    baseURL: 'http://deltaforceenv-env.eba-w2fda3g8.us-east-2.elasticbeanstalk.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});


