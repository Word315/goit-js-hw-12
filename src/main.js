import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');

// Один екземпляр SimpleLightbox для оновлення після рендеру
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements['search-text'].value.trim();

    // Перевірка на пустий рядок перед запитом
    if (!searchQuery) {
        iziToast.warning({ 
            message: 'Please enter a search query.', 
            position: 'topRight' 
        });
        return;
    }

    clearGallery(); // Очищення галереї перед новими результатами
    loader.style.display = 'block';

    try {
        const images = await fetchImages(searchQuery);

        if (images.length === 0) {
            iziToast.error({ 
                message: 'Sorry, no images found. Try another search!', 
                position: 'topRight' 
            });
        } else {
            renderGallery(images);
            lightbox.refresh(); // Оновлюємо lightbox після рендерингу
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
