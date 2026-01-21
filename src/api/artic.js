import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1';

// Fields to retrieve to minimize payload
const FIELDS = 'id,title,artist_display,image_id,date_display,medium_display,place_of_origin,width,height';

export const getImageUrl = (imageId, size = '843,') => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/${size}/0/default.jpg`;
};

export const fetchRandomArtwork = async () => {
    try {
        // First, get a random page. 
        // We'll perform a search to ensure we get items with images.
        // There are about 100k+ works with images.
        // Let's pick a random page from 1 to 1000 to be safe and diverse.
        const randomPage = Math.floor(Math.random() * 1000) + 1;

        const response = await axios.get(`${BASE_URL}/artworks/search`, {
            params: {
                'query[exists][field]': 'image_id',
                'fields': FIELDS,
                'limit': 1,
                'page': randomPage
            }
        });

        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data.data[0];
        }

        throw new Error('No artwork found');
    } catch (error) {
        console.error('Error fetching artwork:', error);
        throw error;
    }
};
