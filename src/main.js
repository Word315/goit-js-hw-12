import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, refreshLightbox } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements['search-text'].value.trim();

    if (!searchQuery) {
        iziToast.warning({ 
            message: 'Please enter a search query.', 
            position: 'topRight' 
        });
        return;
    }

    clearGallery();
    loader.style.display = 'block';

    try {
        const { images } = await fetchImages(searchQuery);

        if (images.length === 0) {
            iziToast.error({ 
                message: 'Sorry, no images found. Try another search!', 
                position: 'topRight' 
            });
        } else {
            renderGallery(images);
            refreshLightbox(); // Оновлюємо lightbox після рендерингу
        }
    } catch (error) {
        iziToast.error({ 
            title: 'Error', 
            message: 'Failed to fetch images. Try again later.', 
            position: 'topRight' 
        });
    } finally {
        loader.style.display = 'none';
    }
});
