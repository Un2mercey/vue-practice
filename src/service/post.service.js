import axios from 'axios';

const POST_URI = 'https://jsonplaceholder.typicode.com/posts?_limit=';
export const fetchPosts = (limit) => {
    return axios.get(`${POST_URI}${limit}`);

};
