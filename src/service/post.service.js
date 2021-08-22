const POST_URI = 'https://jsonplaceholder.typicode.com/posts?_limit=';
export const fetchPosts = async (limit) => {
    const response = await fetch(`${POST_URI}${limit}`);
    return response.json();
};
