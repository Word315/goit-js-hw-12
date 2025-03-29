import axios from 'axios';

const API_KEY = '49577891-dd8edba8495efad2486051016';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    });
    return response.data.hits;
}