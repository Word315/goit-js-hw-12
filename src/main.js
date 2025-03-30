import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, refreshLightbox } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 15; // Кількість зображень на сторінку
let totalHits = 0;

// Обробник події для пошуку
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = event.target.elements['search-text'].value.trim();
    currentPage = 1;
    
    if (!searchQuery) {
        iziToast.warning({ message: 'Please enter a search query.', position: 'topRight' });
        return;
    }

    clearGallery();
    loadMoreButton.hidden = true;
    loader.style.display = 'block';

    try {
        const response = await fetchImages(searchQuery, currentPage, perPage);
        totalHits = response.totalHits;

        if (response.hits.length === 0) {
            iziToast.error({ message: 'Sorry, no images found. Try another search!', position: 'topRight' });
        } else {
            renderGallery(response.hits);
            refreshLightbox();
            if (currentPage * perPage < totalHits) {
                loadMoreButton.hidden = false;
            }
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later.', position: 'topRight' });
    } finally {
        loader.style.display = 'none';
    }
});

// Обробник події для кнопки "Load more"
loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    loader.style.display = 'block';

    try {
        const response = await fetchImages(searchQuery, currentPage, perPage);
        renderGallery(response.hits, true); // Додаємо зображення, а не очищаємо
        refreshLightbox();

        smoothScroll();

        if (currentPage * perPage >= totalHits) {
            loadMoreButton.hidden = true;
            iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later.', position: 'topRight' });
    } finally {
        loader.style.display = 'none';
    }
});

// Функція плавного прокручування сторінки
function smoothScroll() {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.firstElementChild?.getBoundingClientRect().height || 0;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
