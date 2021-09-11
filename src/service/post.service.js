import axios from 'axios';

const POST_URI = 'https://jsonplaceholder.typicode.com/posts';
export const fetchPosts = (page, perPage) => {
    return axios.get(POST_URI, {
        params: {
            _page: page,
            _limit: perPage
        }
    });
};

export const getPost = (id) => {
    return axios.get(`${POST_URI}/${id}`);
}
