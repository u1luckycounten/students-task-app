import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? '/api'
        : process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({ baseURL });

export default API;
