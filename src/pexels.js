const API_KEY = 'vp0AKzhwOt8P9H5aUxyAT8QO4Ym4t7O3EkGK1LRlI5bY2mIbXniUQpYL';
const BASE_URL = 'https://api.pexels.com/v1/search';

export async function searchPhotos(query, perPage = 15, page = 1) {
  try {
    const response = await fetch(`${BASE_URL}?query=${query}&per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.photos; // Array of photo objects
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}
